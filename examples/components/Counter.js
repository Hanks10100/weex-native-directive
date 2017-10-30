// Expected equivalent compilation results

export default {
  props: ['start'],
  data: function data() {
    return {
      count: parseInt(this.start, 10) || 42
    }
  },
  methods: {
    inc: function inc() {
      this.count++;
    }
  },
  style: {
    "output": { "fontSize": 150, "textAlign": "center", "marginTop": 50, "marginRight": 50, "marginBottom": 50, "marginLeft": 50 },
    "button": { "borderWidth": 2, "borderColor": "#DDDDDD", "fontSize": 100, "textAlign": "center", "backgroundColor": "#F5F5F5" }
  },

  render: function (h) {
    return h('div', {
      staticClass: ["counter"]
    }, [
      h('text', {
        staticClass: ["output"],
        attrs: { value: this.count }
      }),
      h('text', {
        staticClass: ["button"],
        on: { "click": this.inc },
        attrs: { value: '+' }
      })
    ])
  },

  // template render function
  '@render': function (h) {
    return h('div', {
      staticClass: ["counter"],
      attrs: {
        '@isComponentRoot': true,
        '@componentProps': {
          start: this.start
        }
      }
    }, [
      h('text', {
        staticClass: ["output"],
        attrs: { value: this.count }
      }),
      h('text', {
        staticClass: ["button"],
        on: { "click": this.inc },
        attrs: { value: '+' }
      })
    ])
  }
}
