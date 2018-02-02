[Proposal](https://github.com/Hanks10100/incubator-weex/issues/1)

# 长列表的复用方案

## 需求背景

+ 长列表（无限列表）在移动端很常见，会消耗大量渲染时间和内存，通常是性能瓶颈。
+ 长列表中有大量节点不在可视区，回收并复用这些节点可以减少内存占用和创建新列表时的开销。
+ 在 Weex 场景下，列表的渲染由前端框架实现，原生端无法介入此渲染过程，很难实现复用。

为了提升渲染性能，可以考虑提供新的渲染长列表的方式。

## 整体设计方案

设计思路：

+ 前端框架中不将长列表展开，而是将列表数据和模板发送到客户端。
+ 客户端根据数据和模板渲染生成列表，并且实现节点的回收和复用。

更强调【数据驱动】和【声明式】的开发方式。

## 模板的描述

把模板里的渲染指令和数据绑定编译成纯静态结构，原样发给客户端。

具体来讲，就是把 Vue 里的 `v-for` 、 `v-if` 之类的模板指令编译成 Weex 自定义的一套原生指令（Weex Native Directive），而这层指令是面向客户端设计的，是原生渲染器和 JS Framework 之间的约定，可以对接到 Vue 和 Rax 等多个框架，基本上都是一一对应的。

需要改造 Vue 的编译工具。

参考 [Implementation.md#模板语法](./Implementation.md#%E6%A8%A1%E6%9D%BF%E8%AF%AD%E6%B3%95)。

## 渲染行为

### 常规组件的渲染

![Render Process](./images/render-process.png)

组件在前端就已经展开成了节点，客户端感知不到哪些节点是由同一类组件创建出来的，无法复用。

### 可复用组件的渲染

![New Render Process](./images/new-render-process.png)

组件不在前端展开，而是把模板和数据发给客户端。

## 前端的改造

![virtual component](./images/virtual-component.png)

+ Virtual Component Template 只有模板节点，没有状态也没生命周期，不执行 render 也不 update，监听事件。
+ Virtual Component 不执行 render 也没有节点，有状态有生命周期，数据更新不触发渲染而是发给客户端。

## 客户端的改造

![native](./images/native-watcher.png)

## 特性分析

分析优缺点，待补充。
