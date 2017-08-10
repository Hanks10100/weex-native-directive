# Weex Native Directive

## 需求背景

+ 长列表（无限列表）在移动端很常见，会消耗大量渲染时间和内存，通常是性能瓶颈。
+ 长列表中有大量节点不在可视区，回收并复用这些节点可以减少内存占用和创建新列表时的开销。
+ 在 Weex 场景下，列表的渲染由前端框架实现，原生端无法介入此渲染过程，很难实现复用。

为了提升渲染性能，可以考虑提供新的渲染长列表的方式。

## 设计方案

设计思路：

+ 前端框架中不将长列表展开，而是将列表数据和子节点的结构发送到客户端。
+ 客户端根据数据和子节点的结构渲染生成列表，并且实现节点的回收和复用。

具体来讲，Vue 和 Rax 等上层框架遇到列表数据时，不再循环生成多个 Virtual DOM 节点，而是将【数据】和【模板】发送给客户端。

## 模板写法

在上层语法中的使用方式如下：

```html
<recycle-list :list-data="longList" template-key="cid">
  <cell-slot template-type="A"></cell-slot>
  <cell-slot template-type="B"></cell-slot>
  <cell-slot template-type="C"></cell-slot>
</recycle-list>
```

+ `<recycle-list>`: 可复用节点的列表，只有该组件才支持当前的优化方案。
  + `list-data`: 数组格式的列表数据。
  + `template-key`: 数据中用于区分子模板类型的字段名。
+ `<cell-slot>`: 节点模板。
  + `template-type`: 当前模板的类型，只有和数据中的类型匹配才会渲染。
  + `key`: 列表中每条数据的唯一键值，用于优化。

在运行时，前端框架会先将带有数据的 `<recycle-list>` 节点发送给客户端，然后再分别发送三个不同类型的 `<cell-slot>` 模板，客户端解析模板中的渲染指令，并且根据数据绑定的信息获取到真实的数据，然后生成真实的原生组件。初次渲染之后，在前端框架中只负责操作数据，将新数据发给客户端；在客户端中做数据比对，根据数据变化更新组件，在此过程中实现组件的复用和优化。

## 指令和绑定的格式

模板语法分为【指令】和【绑定】两类。

+ **指令** 用于声明客户端的解释方式，与渲染行为有关。格式为 `[[directive]]`。
+ **绑定** 用于声明数据的取值方式，与渲染内容有关。格式为 `{ "@binding": expression }`。

> 目前仅考虑支持直接使用属性名作为 expression。

### 属性值绑定

在之前 js 和 native 通信格式的约定中，节点的属性值默认被当做是字符串。现在做如下扩展：

1 **如果节点的属性值是带有 `@binding` 键值的对象，则将该属性值其视为动态内容，对应了列表某条数据里的某个字段，在渲染时替换成数据中的值。**

如果有如下数据和绑定：

```js
// data: [{ expression: 'balala' }, { expression: 'hololo' }]
{
  attr: {
    prop: { '@binding': 'expression' }
  }
}
```

则会被渲染成：

```js
[{
  attr: {
    prop: 'balala'
  }
}, {
  attr: {
    prop: 'hololo'
  }
}]
```

2 **如果节点的属性值是数组，则 map 其中所有元素，将其中带有 `@binding` 键值的对象视为动态内容，并替换成相应的值，最终 reduce 成一条数据（默认使用字符串拼接）。**

如果有如下数据和绑定：

```js
// data: [{ who: 'He', count: 'five' }]
{
  attr: {
    prop: [
      { '@binding': 'who' },
      'I only slept for ',
      { '@binding': 'count' },
      ' hours yesterday.'
    ]
  }
}
```

则会被渲染成：

```js
[{
  attr: {
    prop: 'He only slept for five hours yesterday.'
  }
}]
```

### 事件绑定

在之前的约定中，如果节点上绑定了事件，只会将字符串格式的事件类型发给客户端：

```js
{
  type: 'div',
  event: ['click']
}
```

为了支持给绑定的事件处理函数传递参数，将事件属性的格式做如下扩展：

1. 如果事件列表中某项是个字符串，保持和原有行为一致。
2. 如果事件列表中某项是个对象，则其 `type` 属性指定了事件的类型，`args` 属性指定了其事件处理函数所接受的参数。在客户端中某组件触发了事件的时候，则先从相应的数据中取出函数所需的参数值，通过 `fireEvent` 的参数回传给前端框架。

#### 使用范例

如果模板中绑定了如下格式的事件：

```html
<div @click="handlerA" @appear="handlerB(index, 'static', item.name, $event)"></div>
```

则会将转换成如下结构的模板发送给客户端：

```js
{
  type: 'div',
  event: ['click', {
    type: 'appear',
    args: [
      { '@binding': 'index' },
      'static',
      { '@binding': 'item.name' },
      { '@binding': '$event' }
    ]
  }]
}
```

其中 `click` 事件绑定的是没有额外参数的处理函数，行为和之前保持一致，只把事件类型的字符串发给客户端。 `appear` 事件则指定了四个参数，在发给客户端时，除了声明了绑定的事件类型，还声明了参数的数据绑定。`@binding` 语法和上一节 *属性值绑定* 的语法相同，`index` 和 `item.name` 将从当前对应的数据中取值，`$event` 表示事件对象。

客户端 fireEvent 时传递的数据格式如下：

```js
// 当前数据： { index: 25, item: { name: 'Tom' } }
callJS({
  method: 'fireEvent',

  // 传递给事件处理函数的参数
  params: [25, 'static', 'Tom', {/* event */}],

  // 传递给 jsfm 中 fireEvent 方法的参数
  args: [instanceId, element, type, ...]
})
```

然后前端框架中执行对应的事件处理函数：

```js
handlerA(event)
handlerB(25, 'static', 'Tom', event)
```

### 条件指令

```js
{
  attr: {
    '[[match]]': 'condition'
  }
}
```

条件指令的描述将放在节点的属性中，指令名为 `[[match]]`，指令值是可以转成真假值的表达式。如果表达式对应的数据中的值为 falsy，则不渲染该节点，也不渲染其子节点。

#### 使用范例

如果有如下格式的节点模板：

```js
{
  type: 'cell',
  children: [{
    type: 'div',
    attr: {
      '[[match]]': 'item.key === 3'
    }
  }, {
    type: 'text',
    attr: {
      '[[match]]': 'item.key !== 3'
    }
  }]
}
```

当数据中 `item.key` 的值是 3 的时候则渲染 `<div>` 节点，否则渲染 `<text>` 节点。

### 循环指令

```js
{
  attr: {
    '[[repeat]]': {
      '@exp': 'dataList',
      '@key': 'index',
      '@label': 'item'
    }
  }
}
```

循环指令的描述将放在节点的属性中，属性名为 `[[repeat]]`，属性值包含了三个字段：

> 指令名和字段名都还待定。

+ `@exp`: 将要被循环展开的数据字段名。
+ `@key`: 下标或者数据键名。
+ `@label`: 数据循环展开后，每一条数据的名称。

这三个字段指定的都是数据中的属性名，如果数据中的名称有冲突，以当前作用域（最内层）的值为准。

#### 使用范例

在 Vue 中的如下写法：

```html
<div v-for="(item, i) in dataset.panels">
  <text>{{i}}: {{item.name}}</text>
</div>
```

或者 Rax 中的如下写法：

```jsx
<div>
{
  dataset.panels.map((item, i) => {
    return (<text>{i}: {item.name}</text>)
  })
}
</div>
```

将会生成如下格式的模板：

```js
{
  type: 'div',
  attr: {
    '[[repeat]]': {
      '@exp': 'dataset.panels',
      '@key': 'i',
      '@label': 'item'
    }
  },
  children: [{
    type: 'text',
    attr: {
      value: [{ '@binding': 'i' }, ' ', { '@binding': 'item.name' }]
    }
  }]
}
```

如果有如下数据，真实生成的 UI 节点如下所示：

```js
// dataset.panels = [{ name: 'A' }, { name: 'B' }, { name: 'C' }]

{
  type: 'div',
  children: [{
    type: 'text',
    attr: {
      value: '0: A',
    }
  }, {
    type: 'text',
    attr: {
      value: '1: B',
    }
  }, {
    type: 'text',
    attr: {
      value: '1: B',
    }
  }]
}
```

### 生命周期指令

> TODO: 待完善

当模板中包含了子组件的时候，会涉及如何触发子组件生命周期的问题。

```js
{
  attr: {
    '[[lifecycle]]': {
      '@create': '2333' // 2333 是 callback id
    }
  }
}
```

基于 callback 实现，原生平台在适当的时机会发送一个 js callback。

+ `@create`: 在原生列表元素被创建后触发
+ `@attach`: 在列表元素添加页面后触发
+ `@update`: 列表更新后时触发
+ `@detach`: 列表元素即将销毁时触发

生命周期对应表：

|   | directive |       Vue     |           Rax             |  Android  |      iOS      |
| - | --------- | ------------- | ------------------------- | -         | -             |
|   | -         | beforeCreate  | constructor               | ------    | -             |
| v | create    | created       | -                         | onMeasure | -             |
| v | create    | beforeMount   | componentWillMount        | onDraw    | loadView      |
| v | attach    | mounted       | componentDidMount         | attached  | viewDidLoad   |
|   | -         | -             | componentWillReceiveProps | -         | -             |
|   | -         | -             | shouldComponentUpdate     | -         | -             |
|   | -         | beforeUpdate  | componentWillUpdate       | -         | -             |
| v | update    | updated       | componentDidUpdate        | -         | -             |
| v | detach    | beforeDestroy | componentWillUnmount      | detached  | viewDidUnload |
| v | detach    | destroyed     | -                         | -         | -             |

> Android 和 iOS 组件的生命周期未列全。

## 数据更新

> TODO: 待完善

当更新列表中某条数据时，会触发 `<recycle-list>` 组件的属性值更新，前端框架会将新数据全部发到客户端，由客户端负责 diff 找到真正要更新的节点。

> 有一个优化是，当更新了某一项数据后，只向客户端发送列表中的这一条数据。

## 模板更新

> TODO: 待完善

当模板中含有外层绑定的数据时（不在 `list-data` 指定的数据中），第一次发给客户端的模板是经过取值之后的，客户端无感知，当外层数据变化时，会触发模板的更新。


```html
<recycle-list :list-data="group" template-type="type">
  <cell-slot template-type="A">
    <text>{{title}}</text>
    <text>{{number}}</text>
  </cell-slot>
  <cell-slot template-type="B">
    <text>{{number}} element</text>
  </cell-slot>
</recycle-list>
```

如果数据是这样的：

```js
{
  title: '---- banner ----',
  group: [
    { type: 'A', number: 'first' },
    { type: 'A', number: 'second' },
    { type: 'B', number: 'third' },
  ]
}
```

第一次生成的节点应该是这样的：

```js
[{
  type: 'cell',
  children: [{
    type: 'text',
    attr: { value: '---- banner ----' }
  }, {
    type: 'text',
    attr: { value: 'first' }
  }]
}, {
  type: 'cell',
  children: [{
    type: 'text',
    attr: { value: '---- banner ----' }
  }, {
    type: 'text',
    attr: { value: 'second' }
  }]
}, {
  type: 'cell',
  children: [{
    type: 'text',
    attr: { value: 'third element' }
  }]
}]
```

如果 `title` 发生了变化，则所有 A 类型的模板都要更新。

## 使用限制

+ `<recycle-list>` 中只允许包含 `<cell-slot>` 子节点，不允许有其他类型的节点。
