# 实现细节

这篇文档讲的是 `<recycle-list>` 底层的实现细节。

## 模板语法

为了将模板的渲染逻辑声明式的发送给客户端，对组件的属性做了一些扩展。这些扩展目前都是放在组件的属性中的，可以分为【绑定】和【指令】两类，为了和普通属性区分，对属性名做了特殊约定。**绑定** 用于声明数据的取值方式，与渲染内容有关，以 `@` 开头；**指令** 用于声明节点的展开方式，与渲染行为有关，用 `[[]]` 包裹起来。

具体的语法可以分为如下几类：

+ 值绑定： `@binding`
+ 事件绑定： `{ type, params }`
+ 组件声明：
  + `@isComponentRoot`
  + `@templateId`
  + `@componentProps`
+ 条件指令： `[[match]]`
+ 循环指令： `[[repeat]]`
+ 一次性渲染指令： `[[once]]`

目前已经改造了 Vue 的编译工具，能够把 Vue 的常用模板指令编译成上面描述的这些模板语法。

### 值绑定

格式为 `{ "@binding": expression }`。

> TODO

### 事件绑定

如果事件没绑定参数，则不做特殊处理；如果绑定了参数，则把参数编译成带有绑定信息的数组。

> TODO

```js
{
  type: 'div',
  event: [{
    type: 'click',
    params: [{ '@binding': 'expression' }]
  }]
}
```

### 组件声明

> TODO

|      Property      |   Type  | Note |
| ------------------ | ------- | ---- |
| `@isComponentRoot` | Boolean | 必选，用于标记当前节点为某个组件的根节点 |
| `@templateId`      | String  | 必选，组件模板的唯一标识 |
| `@componentProps`  | Object  | 可选，父组件传递给当前组件的绑定信息 |

```js
{
  type: 'div',
  attr: {
    '@isComponentRoot': true,
    '@templateId': 'virtual-component-template-1',
    '@componentProps': {
      whatever: { '@binding': 'expression' }
    }
  }
}
```

### 条件指令

> TODO

模板中的 `v-if` 、`v-else` 和 `v-else-if` 都将会被编译成一个表达式字符串，添加到节点的 `[[match]]` 属性中。

```js
{
  type: 'div',
  attr: {
    '[[match]]': 'expression'
    }
  }
}
```

### 循环指令

模板中 `v-for` 对应的表达式将会被编译成一个特定格式的对象，添加到节点的 `[[repeat]]` 属性中。目前支持 `alias in expression` 和 `(alias, index) in expression` 这两种写法。

|    Property   |  Type  | Note |
| ------------- | ------ | ---- |
| `@expression` | String | 必选，待展开的表达式 |
| `@alias`      | String | 必选，每一项的别名 |
| `@index`      | String | 可选，下标的变量名 |

例如下面这一小段模板：

```html
<div v-for="(item, i) in dataset.panels"></div>
```

最终发送给客户端的是这样的结构：

```js
{
  type: 'div',
  attr: {
    '[[repeat]]': {
      '@expression': 'dataset.panels',
      '@alias': 'item',
      '@index': 'i'
    }
  }
}
```

### 一次性渲染指令

如果模板中包含 `v-once` 指令，则会在节点的属性中添加 `[[once]]`，表示该节点及其后代节点只会渲染一次，数据改变时也不会更新。

```html
<div v-once></div>
```

最终发送给客户端的是这样的结构：

```js
{
  type: 'div',
  attr: {
    '[[once]]': true
  }
}
```

### 支持的表达式

上述语法中多次提到 **表达式**（expression），它指明了某个指令所绑定的值，如 `{ '@binding': '(a.count + 3) * 0.8' }` 中 `(a.count + 3) * 0.8` 就是一个表达式。这些表达式会以字符串的格式原样发给客户端，由客户端负责解析。

由于环境差异无法支持所有 js 语法，客户端将逐步支持各种操作符，首先支持：

+ [x] 成员运算符：`.` `[]`
+ [x] 分组运算符：`()`
+ [x] 算术运算符：`+` `-` `*` `/` `%` (包括一元运算符 `+` 和 `-`)
+ [x] 比较运算符：`>` `<` `>=` `<=` `===` `!==` (仅支持严格相等或不等，不支持 `==` `!=`)
+ [x] 逻辑运算符：`!` `&&` `||`
+ [x] 条件运算符： `? :`

以后会考虑支持下边的运算符：

+ [ ] 位运算符：`&` `|` `^` `~` `>>` `<<` (不支持补位 `>>>`)
+ [ ] 其他： `typeof` `in` `instanceof`

表达式在运算时不能修改自身或者其他变量的值，要求是没有副作用的“纯”运算，也没有作用域的概念，所以不支持下列运算符：

+ 属性相关：`this` `new` `delete`
+ 赋值： `=` `+=` `-=` `*=` `/=` `%=` `<<=` `>>=` `&=` `^=` `|=`
+ 自增自减： `++` `--`
+ 函数表达式、函数调用

> 客户端只考虑支持单条表达式（Expression），不支持逗号和分号隔开的多个表达式，也不支持语句（Statement）和声明（Declaration）。

#### 表达式中值的类型

为了简化处理，对表达式中的值类型做了一些限制：

+ 变量名：只能用数字、字母下划线和 `$`，不能用其他复杂 unicode 字符，不能以数字开头。
+ 字符串：可以用单引号 `'` 和双引号 `"` 括起来，支持转义字符，不支持 `\u` 的 unicode 编码。
+ 数字：支持整数和 IEEE 754 浮点数，支持使用科学计数法 `e`，不支持 `NaN` 和 `Infinity`，不支持十六进制和八进制。

## 渲染过程

![](./images/send-template.png)

0. 前端在渲染模板时构建 Virtual Component Template，监听客户端发送的 `componentHook`，不触发生命周期，并且阻塞掉列表数据导致的更新。
0. 向组件根节点标记 `@isComponentRoot`，并且生成 `@templateId` 和 `@componentProps` 加入根节点属性中。
0. 将整个列表模板和初始数据一起（append tree 模式），以和渲染正常节点一样的方式发送给客户端。
0. 客户端拿到模板和数据后，由数据驱动模板渲染，回收离屏节点，复用模板结构。

### 取值作用域

变量名以就近原则从列表数据中计算真实值。在一个循环体里 `[[repeat]]` 属性中 `@alias` 和 `@index` 对应的变量名可以覆盖列表数据中的变量名。
组件是独立作用域，只从自身的组件数据中取值，每个 `componentId` 对应一份，不从列表数据中取值。

### 渲染子组件

在渲染过程中，如果遇到某个节点包含了 `@isComponentRoot` 属性，则将当前节点及其后代节点视为一个组件。

![](./images/create-component.png)

0. 首先在客户端中生成一个全局唯一的 `componentId`，作为组件的唯一标识符。
0. 计算组件根节点 `@componentProps` 中定义的绑定信息，生成 `propsData`。
0. 通过 `componentHook` 派发 `create` 的钩子，将 `componentId` 和 `propsData` 发送给前端。
0. 前端中以 `componentId` 和 `propsData` 为初始参数创建 Virtual Component，计算组件的初始状态 `initialState` 并同步返回给客户端。
0. 在前端中触发 Virtual Component 的 `beforeCreate` 和 `created` 生命周期。
0. 客户端使用 `initialState` 中的数据渲染当前组件中的模板，渲染完成后派发 `attach` 的钩子给前端。
0. 在前端中触发 Virtual Component 的 `beforeMount` 和 `mounted` 生命周期。

如果渲染组件的过程中，又遇到了包含 `@isComponentRoot` 的节点，则表示又遇到了子组件，重复上述渲染过程。

## 响应事件

![](./images/fireEvent.png)

当在某个节点上捕获到事件时，

0. 首先找到触发事件的节点对应的 `componentId`，如果找到了则向事件对象 `event` 中添加该属性。
0. 如果事件的定义中包含了参数的绑定信息 `params`，则计算出绑定的参数值，在 `fireEvent` 的时候一起派发给前端。
0. 前端中由 Virtual Component Template 接收到事件，根据 `componentId` 找到指定的 Virtual Component，将事件对象和参数派发给相应的事件处理函数。

## 更新列表数据

列表数据在使用时很可能会被更新，在前端框架里监听了列表数据的常用操作，会同时触发 `<recycle-list>` 的提供的原生方法（component method）将数据更新同步给客户端。


|     Method    |               Arguments              | Return | Note |
| ------------- | ------------------------------------ | ------ | ---- |
| `appendData`  | `(item: any)`                        | void   | 向列表结尾添加一条数据 |
| `appendRange` | `(range: Array<any>)`                | void   | 向列表结尾添加一组数据 |
| `insertData`  | `(index: Number, item: any)`         | void   | 在列表的指定位置插入一条数据 |
| `insertRange` | `(index: Number, range: Array<any>)` | void   | 在列表的指定位置插入一组数据 |
| `updateData`  | `(index: Number, item: any)`         | void   | 更新列表的某一项数据 |
| `removeData`  | `(index: Number, count: Number)`     | void   | 从某个位置开始，删除指定条数的数据 |
| `setListData` | `(newListData: Array<any>)`          | void   | 重新设置整个列表的数据 |

新的数据将会导致页面的重新渲染，其中很可能会触发子组件的创建、更新和删除。

### 创建新组件

如果在更新列表数据时，需要创建某些子组件，整个过程和除此渲染子组件的过程是一样的。

应该生成新的 `componentId` 并计算 `propsData`，然后通过 `create` 的钩子发给前端，前端创建 Virtual Component 并返回 `initialState`，然后客户端用这个数据渲染组件中的模板。

### 更新组件

在更新列表数据时，如果对应的列表模板中包含组件，应该触发组件的更新流程。

![](./images/update.png)

0. 以 `updateData` 这个操作为例，它会更新列表数据中的某一项数据，把下标 `index` 和新的列表项数据 `itemData` 发送给客户端。
0. 如果更新列表数据时遇到了组件，则找到组件对应的 `componentId`，先根据 `@componentProps` 中的绑定信息计算出 `newPropsData`。
0. 将 `newPropsData` 和最初生成的 `propsData` 做对比，如果存在差异，则将差异数据和 `componentId` 一起通过 `syncState` 的钩子发送给前端。
0. 前端框架中重新计算 Virtual Component 的状态，如果数据有变动，则将新状态 `newState` 返回给客户端，并且触发 `beforeUpdate` 生命周期。
0. 客户端根据 `newState` 渲染组件中的模板，并且用 `newPropsData` 替换旧的 `propsData`。
0. 真实节点渲染完成后，通过 `componentHook` 向前端派发 `update` 的钩子。
0. 在前端中触发 Virtual Component 的 `updated` 生命周期。

### 移除组件

如果列表数据的变更导致某些节点被移除掉了，应当检测被移除掉的节点中是否包含组件（是否包含 `@isComponentRoot`），如果包含组件则执行组件移除的逻辑。

![](./images/detach.png)

0. 首先在客户端中找到被移除节点对应的 `componentId`，清除相应的组件数据。
0. 通过 `componentHook` 向前端派发 `detach` 的钩子，把 `componentId` 发送给前端。
0. 在前端中触发 Virtual Component 的 `beforeDestroy` 和 `destroyed` 生命周期。

## 更新组件数据

![](./images/updateComponentData.png)

当前端中 Virtual Component 的状态发生变化之后，会主动触发数据的更新。

0. 前端框架中如果监听到 Virtual Component 的状态有变化，则计算出 `newState` 并且触发 `beforeUpdate` 的生命周期。
0. 然后使用 `updateComponentData` 方法将 `componentId` 和 `newState` 发送给客户端。
0. 客户端根据 `componentId` 找到相应的组件，使用 `newState` 重新渲染组件中的模板。
0. 真实节点渲染完成后，通过 `componentHook` 向前端派发 `update` 的钩子。
0. 前端中触发 Virtual Component 的 `updated` 生命周期。

## 更新模板结构

副作用太多，暂不支持。
