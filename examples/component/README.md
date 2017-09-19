# 使用子组件

在模板中使用的子组件将会有一些语法限制。

## 属性传递

+ 在子组件的根节点上添加 `@isComponentRoot` 属性，并设置为 `true`，表明这是节点是由某个组件的根节点。
+ 将子组件所接受的 props 及其绑定信息添加到根节点的 `@componentProps` 属性中。

### 例子

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
+ computed 属性？
+ watch 属性？

## 生命周期

整体设计参考外层 [README.md](../../README.md#生命周期指令) 中的文档。

由于子组件的实例只会创建一次，所以生命周期的行为和以前不一致。

+ `beforeCreate` 和 `created` 生命周期将在模板发送到客户端以后，节点开始渲染之前，一次性全部触发。
+ `mounted` 生命周期将会延迟触发，因为列表中的节点是重复利用的，只有（即将）滚动到该节点的时候才会触发其 `mounted` 生命周期，而且此时节点是复用了之前的模板，并没有重新创建、挂载，只是模板中的数据更新了。
+ `beforeDestroy` 和  `destroyed` 生命周期将在 `<recycle-list>` 组件销毁时批量触发。


---------------------------------------------------------------------------

+ compiler 进展
+ v-on 如何实现，照现有思路实现
+ 组件传值；给子组件传一个新的 flag 区分子组件。
+ 数据更新，内部数据通过 this.count 的形式实现。
+ 组件生命周期。支持不了，生命周期就是不一样的。
+ react 协议问题（有毒）


typescript 检测，类型判断，

本次会议纪要：

+ 目前 Vue 新的 compiler [已经支持大部分指令](https://github.com/vuejs/vue/pull/6622)，还剩 v-on 指令照着预先的设计继续完成改造，Vue 内部的事件绑定逻辑也需要调整。 @门柳
+ 编译时给子组件传递 `@inRecycleList` 属性（暂定）用来区分子组件是否是在 `<recycle-list>` 使用的，来判断是否生成改造后的（用来发送渲染模板的） `@render` 函数。
+ 子组件属性传值已经跑通，逻辑也理清楚了，还有一些 props 默认值、computed 属性、watch 属性的细节待考虑。
+ 由于原生组件的渲染行为有变化，无论 Vue 还是 Rax 都无法和现有生命周期的语义对齐，考虑提供一套新的符合原生组件渲染行为的生命周期。暂定 `create` `attach` `update` `detach` 和 `destroy` 五个，对应关系参考[生命周期指令](https://github.com/Hanks10100/weex-native-directive#生命周期指令)文档。
+ 将组件的 *模板渲染* 和 *状态管理* 分离开来。在创建 `<recycle-list>` 的时候，只把内部节点子组件的模板发给客户端，暂时阻塞掉生命周期的执行。客户端在实际生成子组件的时候给前端框架发消息，前端框架内创建 *Virtual Component* 用来管理组件的内部状态（数据、事件处理函数、生命周期），然后将更新后的状态发给客户端，并不执行 render 和 patch。
+ 由于 Rax 有单向数据流的开发方式，可以减少使用子组件内部的状态，将数据更新、事件处理传递到顶层组件执行，第一期可以先使用事件派发机制实现生命周期。

暂定下次开会时间是是下周二(9.26)上午 9:30，纽约时间下周一(9.25)晚上 21:30。
