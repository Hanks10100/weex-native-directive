// { "framework": "Vue" }

var listData = [
  { type: 'A', title: 'Tom' },
  { type: 'A', title: 'Jerry' }
]

var Child = {
  props: ['title'],
  render: function (h) {
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
    return h('recycle-list', { appendAsTree: true, attrs: { append: "tree", listData: this.listData, templateKey: 'type', alias: 'item' } }, [
      h('cell-slot', { attrs: { templateType: 'A' } }, [

        // using the banner component
        h('banner', { attrs: { kind: { '@binding': 'item.title' } } })
      ])
    ])
  }
})
