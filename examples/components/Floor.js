// Expected equivalent compilation results

export default {
  props: {
    title: {
      type: String,
      default: '就造专属感，给孩子寻个座椅好玩伴'
    },
    desc: {
      type: String,
      default: '犹记得儿时的风筝带着斑斓的色彩在天空飘过；那小河里躲迷藏的鱼虾，还待着小伙伴们一起去捕捉，如今的孩童没有了这些简单且纯粹的娱乐项目，生活在高楼城市中的他们，该当怎样度过自己的童年才是美好的？'
    },
    count: {
      type: Number,
      default: 237
    },
    pictures: {
      type: Array,
      default: ['https://gw.alicdn.com/tfscom/i3/48292642/TB29OtIakz_F1JjSZFkXXcCaXXa_!!48292642.jpg_250x250q90s200.jpg', 'https://gw.alicdn.com/imgextra/i4/706778912/TB2hvwSXBvBIuJjy1zeXXbGBpXa_!!706778912-0-beehive-scenes.jpg_250x250q90s200.jpg', 'https://gw.alicdn.com/imgextra/i3/706778912/TB2wX.fcxz9F1JjSZFsXXaCGVXa_!!706778912-0-beehive-scenes.jpg_250x250q90s200.jpg']
    }
  },
  style: {
    'floor': { 'marginBottom': 15, 'backgroundColor': '#FFFFFF' },
    'title': { 'fontSize': 40, 'textAlign': 'center', 'paddingTop': 35, 'paddingBottom': 25 },
    'desc': { 'lines': 2, 'color': '#999999', 'fontSize': 30, 'paddingLeft': 30, 'paddingRight': 30 },
    'image-section': { 'flexDirection': 'row', 'justifyContent': 'space-between', 'marginTop': 20 },
    'image': { 'width': 245, 'height': 245 },
    'comment': { 'color': '#52bfe6', 'fontSize': 32, 'textAlign': 'right', 'paddingRight': 50, 'marginTop': 25, 'marginBottom': 20 }
  },

  render: function (h) {
    var vm = this
    return h('div', {
      staticClass: ['floor']
    }, [
      h('text', {
        staticClass: ['title'],
        attrs: {
          value: this.title
        }
      }),
      h('text', {
        staticClass: ['desc'],
        attrs: {
          lines: '2',
          value: this.desc
        }
      }),
      h('div', { staticClass: ['image-section'] },
        vm._l(vm.pictures, function (source, i) {
          return h('image', {
            key: i,
            staticClass: ['image'],
            attrs: {
              'src': source
            }
          })
        })
      ),
      (this.count)
        ? h('text', {
          staticClass: ['comment'],
          attrs: {
            value: this.count + ' 人说好'
          }
        })
        : null
    ])
  },

  // template render function
  '@render': function (h) {
    return h('div', {
      staticClass: ['floor'],
      attrs: {
        '@isComponentRoot': true,
        '@componentProps': {
          floor: this.floor
        }
      }
    }, [
      h('text', {
        staticClass: ['title'],
        attrs: {
          value: { '@binding': 'title' }
        }
      }),
      h('text', {
        staticClass: ['desc'],
        attrs: {
          lines: '2',
          value: { '@binding': 'desc' }
        }
      }),
      h('div', { staticClass: ['image-section'] }, [
        h('image', {
          staticClass: ['image'],
          attrs: {
            '[[repeat]]': {
              '@expression': 'pictures',
              '@alias': 'source',
              '@index': 'i'
            },
            key: { '@binding': 'i' },
            src: { '@binding': 'source' }
          }
        })
      ]),
      h('text', {
        staticClass: ['comment'],
        attrs: {
          '[[match]]': 'count',
          value: [{ '@binding': 'count' }, ' 人说好']
        }
      })
    ])
  }
}
