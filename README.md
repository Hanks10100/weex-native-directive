# 可回收长列表（`<recycle-list>`）

`<recycle-list>` 是一个新的列表容器，具有节点回收和复用的能力，可以大幅优化内存占用和渲染性能。

> **功能还未完成，请谨慎使用！**

## 设计思路

+ 前端框架中不将长列表展开，而是将列表数据和子节点的结构发送到客户端。
+ 客户端根据数据和子节点的结构渲染生成列表，并且实现节点的回收和复用。

对页面和组件的开发方式有些影响，整体上讲是更强调【数据驱动】和【声明式】的开发方式了。细节请参考 [Design.md](./Design.zh.md) 。

## 使用方法

原有 `<list>` 和 `<cell>` 组件的功能不受影响，针对新功能提供了新的 `<recycle-list>` 和 `<cell-slot>` 组件。如果想利用列表回收和复用的特性，使用新组件即可。

> 在 Vue.js 中，该功能部分依赖与编译工具，请确保 `weex-loader` 的版本高于 `0.6.0`（其依赖的 `weex-vue-loader` 版本要高于 `0.5.0`）。

### `<recycle-list>`

`<recycle-list>` 是一个新的列表容器，只能将 `<cell-slot>` 作为其直接子节点，使用其他节点无效。

**支持的属性**

目前支持的语法如下（临时方案）：

+ `list-data`: {`Array<Object>`} **必选** 列表数据。
+ `template-key`: {`String`} 数据中用于区分子模板类型的字段名，默认值是 `"templateType"`。
+ `alias`: {`String`} 指定数据中的每一项在模板中的别名。
+ `index`: {`String`} 指定当前列表下标的变量名，下标值和列表数据的下标一致。

考虑支持更符合语义的语法，将 `list-data` 、`alias` 和 `index` 放在一起，用 `for` 表示，将 `template-key` 改成 `switch`：

+ `for`: "(alias, index) in listData" **必选** 列表循环表达式的简写形式，语义同上。
+ `switch`: 数据中用于区分子模板类型的字段名，默认值是 `"templateType"`。

> `for` 和 `switch` 其实可以视为指令，是仅适用于 Weex 平台的不以 `v-` 开头的指令，和临时方案（标签属性）不一样，不能再添加 `v-bind` 的绑定语法。

### `<cell-slot>`

`<cell-slot>` 代表的是列表每一项的**模板**，并不是实际的节点，它只用来描述某一类*列表项*的结构，本身并不会渲染。`<cell-slot>` 的个数只表示*列表项*的种类个数，真实*列表项*的个数是由数据决定的，。

**支持的属性**

目前支持的语法如下（临时方案）：

+ `template-type`: {`String`} **必选** 当前模板的类型，只有和数据中的类型与当前目标类型匹配时才会渲染。
+ `key`: {`String`} 列表中每条数据的唯一键值，用于优化。

考虑支持更符合语义的语法，将 `template-type` 改为 `case`：

+ `case`: {`String`} **必选** 当前模板的类型，只有和数据中的类型与当前目标类型匹配时才会渲染。
+ `key`: {`String`} 列表中每条数据的唯一键值，用于优化。

### 实例

在上层语法中的使用方式如下（临时方案）：

```html
<recycle-list :list-data="longList" template-key="cellType" alias="item" index="i">
  <cell-slot template-type="A"> ... </cell-slot>
  <cell-slot template-type="B"> ... </cell-slot>
</recycle-list>
```

优化后的语法（待编译工具支持了以后，统一使用这种语法）：

```html
<recycle-list for="(item, i) in longList" switch="cellType">
  <cell-slot case="A"> ... </cell-slot>
  <cell-slot case="B"> ... </cell-slot>
</recycle-list>
```

使用 `for` 、`switch` 和 `case` 更符合语义，也更直观一些。在 `<recycle-list>` 中使用 `for` 指定列表数据项和下边的别名，`switch` 指定了每项数据中用来判断模板的类型的字段名；`case` 用在 `<cell-slot>` 上，用来声明当前模板的类型。

> 参考 Weex online playground 上使用临时语法写的[例子](http://dotwe.org/vue/7d0616648f9884223aaec295cdceaa9f)（暂时还不支持编译[新语法](http://dotwe.org/vue/7e2edce1482c44e7a92229eb134220f1)），Web 端的渲染还不支持，使用最新版 Weex playground app 扫码可以查看原生渲染效果。目前最新版 playground app 还未在市场发布，代码在 apache/incubator-weex 仓库主分支中，可以自行打包。~~使用最新版手机淘宝扫码也可以查看渲染效果。~~

## 注意事项

+ `<recycle-list>`

## 例子

> 把考虑到的情况都列出来了，还未全部支持。~~最终也不一定能全部支持~~。

**模板语法**

+ [动态文本 `{{}}`](http://dotwe.org/vue/7d0616648f9884223aaec295cdceaa9f)
+ [绑定属性 `v-bind`](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [循环 `v-for`](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [多层循环](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [条件渲染 `v-if`/`v-else`/`v-else-if`](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [双向绑定 `v-model`](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [一次性渲染 `v-once`](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [绑定事件 `v-on`](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [动态样式](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [指令搭配使用](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)

**`<recycle-list>` 组件的功能**

+ [数据更新](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [computed](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [watch](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [生命周期](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [mixin](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [filter](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)

**使用子组件**

+ [纯静态子组件](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [无状态，有 props](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [props 更新](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [有内部状态](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [内部状态更新](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [绑定事件](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [生命周期](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [生命周期](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)

**复杂用法**

+ [使用各种类型的组件](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [嵌套 list](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [使用 `<component>`](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [使用 `<template>`](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [使用 `<slot>`](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
+ [在子组件中使用 `<recycle-list>`](http://dotwe.org/vue/123b69b57e099036558745298fb6e8ca) (TODO)
