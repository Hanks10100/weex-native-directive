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
