// { "framework": "Vue" }

// http://dotwe.org/vue/e267f6bfd9d87f62c3c58d58fc506ff7

const Counter = {
  props: ['start'],
  data: function () {
    return {
      count: parseInt(this.start, 10) || 42
    }
  },
  methods: {
    inc: function () {
      this.count++
    }
  },
  style: {
    output: {
      fontSize: 150,
      textAlign: 'center',
      marginTop: 80
    },
    btn: {
      borderWidth: 2,
      borderColor:' #DDD',
      fontSize: 100,
      textAlign: 'center',
      backgroundColor: '#F5F5F5',
    }
  },
  render: function (h) {
    h('div', {
      attrs: {
        '@isComponentRoot': true,
        '@componentProps': { start: this.start }
      }
    }, [
      h('text', { class: ['output'], attrs: { value: { '@binding': 'count' } } }),
      h('text', {
        class: ['btn'], attrs: { value: '+' },
        on: { click: this.inc }
      })
    ])
  }
}

new Vue({
  el: 'body',
  data: function () {
    return {
      listData: [
        { type: 'A', count: 25 },
        { type: 'A', count: 48 },
        { type: 'A', count: 37 }
      ]
    }
  },
  methods: {
    inc () {
      this.listData.forEach(cell => cell.count++)
    }
  },
  render: function (h) {
    return h('div', {}, [h('recycle-list', {
        appendAsTree: true,
        attrs: { append: "tree", listData: this.listData, templateKey: 'type', alias: 'item', index: "i" }
      }, [
        h('cell-slot', { attrs: { templateType: 'A' } }, [
          h('div', {}, [
            h('text', { class: ['output'], attrs: { value: { '@binding': 'item.count' } } }),
            h('text', {
              class: ['btn'], attrs: { value: '+' },
              on: { click: this.inc }
            })
          ])
        ])
      ])
    ])
  }
})
