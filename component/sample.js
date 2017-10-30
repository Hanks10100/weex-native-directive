// Expected equivalent compilation results

export default {
  props: {
    content: {
      type: String,
      default: '- nothing -'
    }
  },
  style: {
    'text': { 'fontSize': 80, 'textAlign': 'center' }
  },

  // normal render function
  render: function (h) {
    return h('div', {
      staticStyle: { justifyContent: 'center' }
    }, [
      h('text', {
        staticClass: ['text'],
        attrs: { value: this.content }
      })
    ])
  },

  // template render function
  '@render': function (h) {
    return h('div', {
      staticStyle: { justifyContent: 'center' },
      attrs: {
        '@isComponentRoot': true,
        '@componentProps': {
          content: this.content
        }
      }
    }, [
      h('text', {
        staticClass: ['text'],
        attrs: { value: { '@binding': 'content' } }
      })
    ])
  }
}
