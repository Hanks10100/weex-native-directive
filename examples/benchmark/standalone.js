// { "framework": "Vue" }

var listData = [
  { type: 'A', name: 'Tom', kind: 'cat' },
  { type: 'A', name: 'Jerry', kind: 'mouse' }
]

var Child = {
  props: ['kind'],
  render: function (h) {
    return h('text', {}, '(' + this.kind + ')')
  }
}

new Vue({
  el: 'body',
  components: { child: Child },
  data: function () {
    return {
      listData: listData
    }
  },
  render: function (h) {
    return h('recycle-list',
      { attrs: { listData: this.listData, templateKey: 'type', alias: 'item' } },
      [
        h('cell-slot', { attrs: { templateType: 'A' } }, [
          h('text', { attrs: { value: ['name: ', { '@binding': 'item.name' }] } }),

          // using the child component
          h('child', { attrs: { kind: { '@binding': 'item.kind' } } })
        ])
      ]
    )
  }
})
const exampleMap = [{
  type: 'component',
  name: '组件',
  group: [{
    type: 'div',
    name: 'div',
    examples: [{
      url: 'http://dotwe.org/raw/dist/3b60cee9662db7b4b80e39d233756935.bundle.wx',
      title: 'basic example',
      screenshot: 'http://img.alicdn.com/imgextra/i4/381329993/TB2TFBLbRUSMeJjSspfXXX0VFXa_!!381329993-0-beehive-scenes.jpg'
    }, {
      url: 'http://dotwe.org/raw/dist/3b60cee9662db7b4b80e39d233756935.bundle.wx',
      title: 'basic example',
      screenshot: 'http://img.alicdn.com/imgextra/i4/381329993/TB2TFBLbRUSMeJjSspfXXX0VFXa_!!381329993-0-beehive-scenes.jpg'
    },{
      url: 'http://dotwe.org/raw/dist/3b60cee9662db7b4b80e39d233756935.bundle.wx',
      title: 'basic example',
      screenshot: 'http://img.alicdn.com/imgextra/i4/381329993/TB2TFBLbRUSMeJjSspfXXX0VFXa_!!381329993-0-beehive-scenes.jpg'
    }, {
      url: 'http://dotwe.org/raw/dist/3b60cee9662db7b4b80e39d233756935.bundle.wx',
      title: 'basic example',
      screenshot: 'http://img.alicdn.com/imgextra/i4/381329993/TB2TFBLbRUSMeJjSspfXXX0VFXa_!!381329993-0-beehive-scenes.jpg'
    }, {
      url: 'http://dotwe.org/raw/dist/3b60cee9662db7b4b80e39d233756935.bundle.wx',
      title: 'basic example',
      screenshot: 'http://img.alicdn.com/imgextra/i4/381329993/TB2TFBLbRUSMeJjSspfXXX0VFXa_!!381329993-0-beehive-scenes.jpg'
    }]
  }, {
    type: 'text',
    name: 'text',
    examples: [{
      url: 'http://dotwe.org/raw/dist/3b60cee9662db7b4b80e39d233756935.bundle.wx',
      title: 'basic example',
      screenshot: 'http://img.alicdn.com/imgextra/i4/381329993/TB2TFBLbRUSMeJjSspfXXX0VFXa_!!381329993-0-beehive-scenes.jpg'
    }]
  }]
}, {
  type: 'module',
  name: '模块',
  group: [{
    type: 'stream',
    name: 'stream',
    examples: []
  }]
}, {
  type: 'showCase',
  name: '用例',
  group: []
}]
const examples = {
  component: {
    div: [{
      url: 'http://dotwe.org/raw/dist/3b60cee9662db7b4b80e39d233756935.bundle.wx',
      title: 'basic example',
      screenshot: 'http://img.alicdn.com/imgextra/i4/381329993/TB2TFBLbRUSMeJjSspfXXX0VFXa_!!381329993-0-beehive-scenes.jpg'
    }, {
      url: 'http://dotwe.org/raw/dist/3b60cee9662db7b4b80e39d233756935.bundle.wx',
      title: 'basic example',
      screenshot: 'http://img.alicdn.com/imgextra/i4/381329993/TB2TFBLbRUSMeJjSspfXXX0VFXa_!!381329993-0-beehive-scenes.jpg'
    },{
      url: 'http://dotwe.org/raw/dist/3b60cee9662db7b4b80e39d233756935.bundle.wx',
      title: 'basic example',
      screenshot: 'http://img.alicdn.com/imgextra/i4/381329993/TB2TFBLbRUSMeJjSspfXXX0VFXa_!!381329993-0-beehive-scenes.jpg'
    }, {
      url: 'http://dotwe.org/raw/dist/3b60cee9662db7b4b80e39d233756935.bundle.wx',
      title: 'basic example',
      screenshot: 'http://img.alicdn.com/imgextra/i4/381329993/TB2TFBLbRUSMeJjSspfXXX0VFXa_!!381329993-0-beehive-scenes.jpg'
    }, {
      url: 'http://dotwe.org/raw/dist/3b60cee9662db7b4b80e39d233756935.bundle.wx',
      title: 'basic example',
      screenshot: 'http://img.alicdn.com/imgextra/i4/381329993/TB2TFBLbRUSMeJjSspfXXX0VFXa_!!381329993-0-beehive-scenes.jpg'
    }],
    text: [{
      title: '',
      url: 'xxx'
    }]
  },
  module: {

  },
  showCase: {

  }
}
