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
