# 使用子组件

在模板中使用的子组件将会有一些语法限制。

## 属性传递

+ 在子组件的根节点上添加 `@isComponentRoot` 属性，并设置为 `true`，表明这是节点是由某个组件的根节点。
+ 将子组件所接受的 props 及其绑定信息添加到根节点的 `@componentProps` 属性中。

假如说 banner 组件的定义如下：

```js
Vue.component('banner', {
  props: ['title'],
  template: `<text>[------- {{title}} -------]</text>`
})
```

在 `<cell-slot>` 中用到了 banner 组件：

```html
<cell-slot>
  <banner title="item.title"></banner>
</cell-slot>
```

实际上 banner 组件应该编译成如下结果：

```js
// <cell-slot> 中 <banner> 组件的编译结果
h('cell-slot', {}, [
  h('banner', {
    attrs: {
      title: { '@binding': 'item.title' }
    }
  })
])

// banner 组件自身的编译结果
Vue.component('banner', {
  props: ['title'],
  render (h) {
    return h('text', {
      attrs: {
        '@isComponentRoot': true,
        '@componentProps': {
          title: this.title
        },
        value: ['[------- ', { '@binding': 'title' }, ' -------]']
      }
    })
  }
})
```

最终发到客户端的数据是：

```js
{
  type: 'cell-slot',
  children: [{
    type: 'text',
    attr: {
      '@isComponentRoot': true,
      '@componentProps': {
        title: { '@binding': 'item.title' }
      },
      value: ['[------- ', { '@binding': 'title' }, ' -------]']
    }
  }]
}
```

### 问题

+ [Props 验证](https://cn.vuejs.org/v2/guide/components.html#Prop-验证) 将会失效，因为子组件 props 中拿到的是绑定关系，类型都是 `Object`，并不是真实的 props 值。
+ props 默认值？

## 生命周期

由于渲染行为发生了改变，生命周期的含义也发生了变化，不同的前端框架、不同客户端中组件的生命周期也都不一样。为了最小化这些差异，以 `<recycle-list>` 本身的渲染行为为参考，取平台和框架的交集，将组件的生命周期做了简化：

+ `create`: 在原生列表元素被创建后触发。
+ `attach`: 在列表元素添加页面后触发。
+ `update`: 列表更新后时触发。
+ `detach`: 列表元素即将销毁时触发。

生命周期对应表：

|   | directive |       Vue     |           Rax             |  Android  |      iOS      |
| - | --------- | ------------- | ------------------------- | -         | -             |
|   | create    | beforeCreate  | constructor               | ------    | -             |
| * | create    | created       | -                         | onMeasure | -             |
|   | attach    | beforeMount   | componentWillMount        | onDraw    | loadView      |
| * | attach    | mounted       | componentDidMount         | attached  | viewDidLoad   |
|   | -         | -             | componentWillReceiveProps | -         | -             |
|   | -         | -             | shouldComponentUpdate     | -         | -             |
|   | update    | beforeUpdate  | componentWillUpdate       | -         | -             |
| * | update    | updated       | componentDidUpdate        | -         | -             |
| * | detach    | beforeDestroy | componentWillUnmount      | detached  | viewDidUnload |
|   | detach    | destroyed     | -                         | -         | -             |

> Android 和 iOS 组件的生命周期未列全。

主要差异点是：

+ `beforeCreate` 和 `created` 生命周期将在模板发送到客户端以后，节点开始渲染之前，才逐个触发。
+ `beforeMount` 和 `mounted` 将会延迟触发，因为列表中的节点是重复利用的，只有即将滚动到该节点的时候才会渲染，而且此时节点是复用了之前的模板，只是更新了其中都数据，并没有重新创建、挂载。
+ `beforeDestroy` 和 `destroyed` 生命周期将在 `<recycle-list>` 组件销毁时批量触发。

涉及的改造有：

+ 编译工具支持生成 `@render`。
+ Vue.js 支持创建 Virtual Component。
+ 客户端支持将生命周期钩子和组件的 ref 发送给前端框架。
+ JS Framework 要能支持派发原生组件的生命周期，以及提供专用的数据更新接口。

## 内部状态管理

## Virtual Component

Virtual Component 是指没有对应的 Virtual DOM、只用于管理内部状态的虚拟组件。默认将包含了 `@render` 函数的组件都视为 Virtual Component。

### 对编译工具的改造

+ 编译 `<recycle-list>` 的时候，给其中的子组件挂上 `@inRecycleList` 属性，包含此属性的子组件将额外生成 `@render` 函数，用于发送模板。
+ 在 `@render` 中，将数据绑定和渲染指令编译成和 `<recycle-list>` 相同的语法。
+ 在 `@render` 中，给子组件的根节点额外添加几条属性：
  + `@isComponentRoot`: {Boolean} 用于标记当前节点为某个组件的根节点。便于客户端划分变量名的作用域。
  + `@componentProps`: {Object} 父组件使用当前组件时，给每条属性传递的绑定信息。

### 渲染过程

![Component Render Process](../images/component-render-process.png)

+ 组件初次渲染时，不执行 `render` 函数而是执行 `@render` 函数，并且不触发生命周期的钩子。
+ `@render` 函数返回当前组件的模板，挂载到父组件生成的模板中，一起发送给客户端。
+ 客户端拿到整个列表的数据和模板之后，由数据驱动模板渲染。当渲染到某个子组件时，触发 `hook:create` 将节点的真实 `ref` 发送给 Virtual Component。
+ 每接收到一条 `hook:create` 就创建一个新的 Virtual Component，存储真实节点的 `ref`，并且触发 `beforeCreate` 和 `created` 生命周期。
+ 如果内部数据有更新，通过 `updateData` 指令将 `ref` 和新数据发送给客户端。
+ 当原生组件渲染完成并挂载到列表中后，触发 `hook:attach` 发送给相应的 Virtual Component，然后执行组件的 `beforeMount` 和 `mounted` 生命周期。
+ 如果内部数据有更新，通过 `updateData` 指令将 `ref` 和新数据发送给客户端，并且触发 `beforeUpdate` 生命周期。
+ 对于已经挂载过的节点，数据更新后触发 `hook:update` 发送给相应的 Virtual Component，然后执行组件的 `updated` 生命周期。
+ 当 `<recycle-list>` 被销毁时，给其中所有子组件都批量触发 `hook:detach`，然后执行组件的 `beforeDestroy` 和 `destroyed` 生命周期。

## 例子

在当前目录下有三个文件：

+ `sample.vue`: 一个简单的组件源码。
+ `sample.js`: 编译工具应当生成的等价代码，除了 `@render` 以外，其他都应该和现有工具的编译结果一致。
+ `sample.vdom.js`: 在 `<recycle-list>` 中该组件应该发送给客户端的模板结构。

另外在 [`../examples/components`](../examples/components) 目录下也有两个组件，会被外层的实际例子引用：

+ `Floor.vue` 和 `Floor.js`: 无状态的静态组件，及其等价 js 代码。
+ `Counter.vue` 和 `Counter.js`: 有状态并且绑定了实际的组件，及其等价 js 代码。
