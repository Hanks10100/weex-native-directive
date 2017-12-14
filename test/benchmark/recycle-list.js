// { "framework": "Vue" }

var modal = weex.requireModule('modal')

// 单行文字的例子 http://dotwe.org/vue/9b230114121d479fad28c0eb18726acf
var Line = {
  props: ['name', 'kind'],
  render: function (h) {
    return h('text', {
      style: {
        fontSize: 50,
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        color: '#666666',
        marginBottom: 10,
      },
      attrs: {
        '@isComponentRoot': true,
        '@componentProps': {
          name: this.name,
          kind: this.kind
        },
        value: [{ '@binding': 'name' }, ' (', { '@binding': 'kind' }, ')']
      }
    })
  }
}

// 某种展示商品的楼层 http://dotwe.org/vue/a8bf6607800bb8c0d7c0b41ef2f596ab
var floorStyles = {
  title: {
    fontSize: 40,
    textAlign: 'center',
    paddingTop: 35,
    paddingBottom: 25
  },
  desc: {
    lines: 2,
    color: '#999',
    fontSize: 30,
    paddingLeft: 30,
    paddingRight: 30
  },
  comment: {
    color: '#52bfe6',
    fontSize: 32,
    textAlign: 'right',
    paddingRight: 50,
    marginTop: 25,
    marginBottom: 20
  }
}
var Floor = {
  props: ['floor'],
  render: function (h) {
    return h('div', {
      attrs: {
        '@isComponentRoot': true,
        '@componentProps': { floor: this.floor },
        '[[lifecycle]]': {
          '@create': function () {
            console.log(' => create floor component')
          },
          '@attach': function () {
            console.log(' => attach floor component')
            modal.toast({ message: 'attach floor component' })
          }
        }
      },
      style: { backgroundColor: '#FFFFFF', marginBottom: 15 }
    }, [
      h('text', { style: floorStyles.title, attrs: { value: { '@binding': 'floor.title' } } }),
      h('text', { style: floorStyles.desc, attrs: { value: { '@binding': 'floor.desc' }, lines: 2 } }),
      h('div', { style: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 } }, [
        h('image', {
          style: { width: 245, height: 245 },
          attrs: {
            '[[repeat]]': {
              '@expression': 'floor.pictures',
              '@index': 'i',
              '@alias': 'src',
            },
            key: { '@binding': 'i' },
            src: { '@binding': 'src' },
          }
        })
      ]),
      h('text', { style: floorStyles.comment, attrs: { value: [{ '@binding': 'floor.count' }, ' 人说好'] } })
    ])
  }
}

// 页签 http://dotwe.org/vue/940c4b11fdecd090b182c94074ab1e74
var TabHeader = {
  props: ['tabs'],
  data: function () {
    return { activeTab: 0 }
  },
  methods: {
    select: function (index) {
      this.activeTab = index
    }
  },
  style: {
    "tab-list": {
      "flexDirection": "row",
      "backgroundColor": "#f51438"
    },
    "active": {
      "backgroundColor": "#e00022"
    },
    "icon": {
      "width": 45,
      "height": 45
    },
    "title": {
      "fontSize": 28,
      "color": "#FFFFFF",
      "marginTop": 10
    }
  },
  render: function (h) {
    return h('div', {
      staticClass: ["tab-list"],
      attrs: { '@isComponentRoot': true, '@componentProps': { tabs: this.tabs } }
    }, [
      h('div', {
        class: [{ '@binding': this.activeTab + " == i ? 'active' : ''" }],
        style: { "height": 120, "width": 150, "justifyContent": "center", "alignItems": "center" },
        attrs: {
          '[[repeat]]': {
            '@expression': 'tabs',
            '@alias': 'tab',
            '@index': 'i'
          },
          key: { '@binding': 'i' },
        },
        on: {
          click: {
              handler: function(i, $event) {
                this.select(i)
              },
              params: [{ '@binding': 'i' }]
            }
          }
        }, [
          h('image', { staticClass: ["icon"], attrs: { src: { '@binding': 'tab.icon' } } }),
          h('text', { staticClass: ["title"], attrs: { value: { '@binding': 'tab.title' } } })
        ]
      )
    ])
  }
}

// 某种应用列表展示 http://dotwe.org/vue/4fcf51377cea77dfa355594669bde7f7
var appListStyle = {
  box: {
    width: 180,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    width: 180,
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 15,
    color: '#999999',
  },
  icon: {
    width: 140,
    height: 140,
    marginLeft: 20,
  }
}
var AppList = {
  props: ['apps'],
  render: function (h) {
    return h('div', {
      attrs: {
        '@isComponentRoot': true,
        '@componentProps': { apps: this.apps }
      },
      style: { flexDirection: 'row' }
  }, [
      h('div', {
        style: appListStyle.box,
        attrs: {
          '[[repeat]]': {
            '@expression': 'apps',
            '@index': 'i',
            '@alias': 'app'
          },
          key: { '@binding': 'i' }
        },
      }, [
        h('image', { style: appListStyle.icon, attrs: { src: { '@binding': 'app.icon' } } }),
        h('text', { style: appListStyle.title, attrs: { value: { '@binding': 'app.title' } } })
      ])
    ])
  }
}

// 某种商品卡片 http://dotwe.org/vue/14791cf9883b9bc1ca22f994415873d5
var Card = {
  props: ['card', 'index'],
  data: function () {
    return {
      count: { '@binding': 'parseInt(card.got, 10)' }
    }
  },
  style: {
    "row": { "flexDirection": "row" },
    "card": { "width": 710, "marginTop": 20, "marginLeft": 20, "backgroundColor": "#FFFFFF", "borderRadius": 10 },
    "banner": { "width": 222, "height": 60 },
    "side": { "paddingTop": 20, "paddingRight": 20, "paddingBottom": 20, "paddingLeft": 20 },
    "poster": { "width": 230, "height": 230, "marginRight": 20 },
    "title": { "fontSize": 26, "color": "#666666", "marginTop": 10, "paddingBottom": 6 },
    "line": { "alignItems": "center", "paddingTop": 5, "paddingBottom": 5 },
    "icon": { "width": 36, "height": 36, "marginRight": 8 },
    "subtitle": { "fontSize": 28, "color": "#07152a" },
    "progress": { "flexDirection": "row", "alignItems": "center", "width": 230, "height": 30, "backgroundColor": "#FEC1C1", "borderRadius": 20, "marginTop": 10, "marginBottom": 10 },
    "progress-inner": { "position": "absolute", "height": 30, "left": 0, "borderRadius": 20, "backgroundColor": "#ff3c32" },
    "got": { "position": "absolute", "left": 8, "lineHeight": 30, "color": "#FFFFFF", "fontSize": 22 },
    "remain": { "position": "absolute", "right": 8, "lineHeight": 30, "color": "#FFFFFF", "fontSize": 22 },
    "info": { "width": 400, "flexDirection": "row", "alignItems": "flex-end" },
    "price": { "fontSize": 52, "color": "#ff3c32", "marginBottom": -10, "marginTop": 10, "marginRight": 8 },
    "fake-price": { "fontSize": 28, "color": "#999999", "textDecoration": "line-through" },
    "btn": { "position": "absolute", "right": 0, "bottom": 0, "backgroundColor": "#ff5d62", "borderRadius": 8, "width": 125, "height": 52, "justifyContent": "center" },
    "btn-text": { "color": "#FFFFFF", "fontSize": 32, "textAlign": "center" }
  },
  render: function (h) {
    return h('div', {
      staticClass: ["card"],
      attrs: {
        '@isComponentRoot': true, '@componentProps': { card: this.card },
        '[[lifecycle]]': {
          '@create': function () {
            console.log(' => create Card component')
            var self = this
            setInterval(function () {
              self.count++
            }, 80)
          }
        }
      },
      on: {
        "appear":{
          handler: function (i, $event) {
            modal.toast({ message: 'appear ' + i })
          },
          params: [{ '@binding': 'index' }]
        }
      }
    }, [
      h('div', { staticStyle: { height: 60, paddingLeft: 30 } }, [
        h('image', { staticClass: ["banner"], attrs: { "src": "https://img.alicdn.com/tfs/TB1moeURFXXXXasXXXXXXXXXXXX-390-105.png" } })
      ]),
      h('div', { staticClass: ["row"], staticStyle: { paddingBottom: "18px" } }, [
        h('div', { staticClass: ["side"] }, [
          h('image', { staticClass: ["poster"], attrs: { "src": { '@binding': 'card.poster' } } })
        ]),
        h('div', { staticClass: ["message"] }, [
          h('text', { staticClass: ["title"], attrs: { value: { '@binding': 'card.title' } } }),
          h('div', { staticClass: ["line", "row"] }, [
            h('image', { staticClass: ["icon"], attrs: { "src": "//ossgw.alicdn.com/img/upload/0a4946e164acd1f81e97ddbc048afcc5/Group13-69-69.png@22w_22h_80Q.png" } }),
            h('text', { staticClass: ["subtitle"], attrs: { value: { '@binding': 'card.subtitle1' } } })
          ]),
          h('div', { staticClass: ["line", "row"] }, [
            h('image', { staticClass: ["icon"], attrs: { "src": "//ossgw.alicdn.com/img/upload/0a4946e164acd1f81e97ddbc048afcc5/Group13-69-69.png@22w_22h_80Q.png" } }),
            h('text', { staticClass: ["subtitle"], attrs: { value: { '@binding': 'card.subtitle2' } } })
          ]),
          h('div', { staticClass: ["progress", "row"] }, [
            h('div', { staticClass: ["progress-inner"], style: { width: { '@binding': 'card.progress * 230 / 100' } } }),
            h('text', { staticClass: ["got"], attrs: { value: '已抢' + this.count + '件' } }),
            // h('text', { staticClass: ["got"], attrs: { value: ['已抢', { '@binding': 'card.got' }, '件'] } }),
            h('text', { staticClass: ["remain"], attrs: { value: [{ '@binding': 'card.progress' }, '%'] } })
          ]),
          h('div', { staticClass: ["info", "row"] }, [
            h('text', { staticClass: ["price"], attrs: { value: ['¥', { '@binding': 'card.price.real' }] } }),
            h('text', { staticClass: ["fake-price"], attrs: { value: ['¥', { '@binding': 'card.price.fake' }] } }),
            h('div', { staticClass: ["btn"] }, [
              h('text', { staticClass: ["btn-text"], attrs: { value: '马上抢' } })
            ])
          ])
        ])
      ])
    ])
  }
}

var dataset = {
  A: [
    { type: 'A', name: 'Tom', kind: 'cat' },
    { type: 'A', name: 'Jerry', kind: 'mouse' }
  ],
  apps: [{
    type: 'apps',
    apps: [
      {
        title: 'AAAA',
        icon: 'http://img.alicdn.com/tfs/TB1sWLoRVXXXXbdXXXXXXXXXXXX-140-140.png',
      }, {
        title: 'BBBB',
        icon: 'http://gw.alicdn.com/tfs/TB10.R_SpXXXXbtXXXXXXXXXXXX-140-140.png',
      }, {
        title: 'CCCC',
        icon: 'http://img.alicdn.com/tfs/TB1fRVASpXXXXXdXXXXXXXXXXXX-140-140.png',
      }, {
        title: 'DDDD',
        icon: 'http://img.alicdn.com/tfs/TB1_TkdPVXXXXcJXXXXXXXXXXXX-140-140.png',
      }
    ]
  }],
  tab: [{
    type: 'tab',
    tabs: [{
      title: '首页',
      icon: '//gw.alicdn.com/tfs/TB19YESOVXXXXaNaXXXXXXXXXXX-45-45.png'
    }, {
      title: '耍帅',
      icon: '//gw.alicdn.com/tfs/TB1I2E9OVXXXXbFXVXXXXXXXXXX-45-45.png'
    }, {
      title: '旅行',
      icon: '//gw.alicdn.com/tfs/TB1gUhyPXXXXXX5XXXXXXXXXXXX-45-45.png'
    }, {
      title: '潮玩',
      icon: '//img.alicdn.com/tfs/TB1D4RzQFXXXXcoXpXXXXXXXXXX-45-45.png'
    }, {
      title: '穿搭',
      icon: '//gw.alicdn.com/tfs/TB1N1.6OVXXXXXqaXXXXXXXXXXX-45-45.png'
    }]
  }],
  floor: [
    {
      type: 'floor',
      title: '就造专属感，给孩子寻个座椅好玩伴',
      desc: '犹记得儿时的风筝带着斑斓的色彩在天空飘过；那小河里躲迷藏的鱼虾，还待着小伙伴们一起去捕捉，如今的孩童没有了这些简单且纯粹的娱乐项目，生活在高楼城市中的他们，该当怎样度过自己的童年才是美好的？',
      pictures: [
        'https://gw.alicdn.com/tfscom/i3/48292642/TB29OtIakz_F1JjSZFkXXcCaXXa_!!48292642.jpg_250x250q90s200.jpg',
        'https://gw.alicdn.com/imgextra/i4/706778912/TB2hvwSXBvBIuJjy1zeXXbGBpXa_!!706778912-0-beehive-scenes.jpg_250x250q90s200.jpg',
        'https://gw.alicdn.com/imgextra/i3/706778912/TB2wX.fcxz9F1JjSZFsXXaCGVXa_!!706778912-0-beehive-scenes.jpg_250x250q90s200.jpg'
      ],
      count: 237,
    }, {
      type: 'floor',
      title: '睡袍穿不对，脱光也不媚！',
      desc: '“Ihatemynightgown（我讨厌我的睡袍）.”经典电影《罗马假日》中，赫本饰演的安妮公主躺在梦幻的宫廷大床上，抱怨她身上那华丽的大睡袍臃肿不便，为公主的浪漫逃逸埋下伏笔。想象一下，男朋友刚刚',
      pictures: [
        'https://gw.alicdn.com/imgextra/i3/3044653839/TB2a_nAXgsSMeJjSspdXXXZ4pXa_!!3044653839-0-daren.jpg_250x250q90s200.jpg',
        'https://gw.alicdn.com/imgextra/i1/3044653839/TB2qrPCXiERMeJjSspiXXbZLFXa_!!3044653839-0-daren.jpg_250x250q90s200.jpg',
        'https://gw.alicdn.com/imgextra/i1/3044653839/TB2ySjuXgsSMeJjSspeXXa77VXa_!!3044653839-0-beehive-scenes.jpg_250x250q90s200.jpg'
      ],
      count: 876,
    }, {
      type: 'floor',
      title: '上天入海？运动相机帮你搞定',
      desc: '现如今相机好像成为了我们每个人必不可少的装备，不管是专业的相机还是我们可拍照的手机，我们使用到它的频率也越来越高。为了追求更好的拍摄质量，人们似乎也愿意花更多的钱去购买好的拍摄装备',
      pictures: [
        'https://gw.alicdn.com/tfscom/i3/462856946/TB2VzQswB4lpuFjy1zjXXcAKpXa_!!462856946.jpg_250x250q90s200.jpg',
        'https://gw.alicdn.com/tfscom/i2/2811920170/TB2rCqHpVXXXXcZXpXXXXXXXXXX_!!2811920170.png_250x250.jpg',
        'https://gw.alicdn.com/imgextra/i4/836552381/TB2c1q3aZSfF1JjSsplXXbrKFXa_!!836552381-0-beehive-scenes.jpg_250x250q90s200.jpg'
      ],
      count: 59,
    }, {
      type: 'floor',
      title: '关于培根的那些事，教你吃得门清',
      desc: '培根一直被认为是早餐的头盘，早上烤两片面包，平底锅煎一片培根、一个鸡蛋，和生菜一起夹在面包中，有荤有素，就是一顿丰富美味的西式早餐。培根的英文名是“Bacon”，原意是烟熏的猪肋条肉，或烟熏背脊肉',
      pictures: [
        'https://gw.alicdn.com/imgextra/i2/603964020/TB24zFbarwTMeJjSszfXXXbtFXa_!!603964020-0-daren.jpg_250x250q90s200.jpg',
        'https://gw.alicdn.com/imgextra/i2/603964020/TB2txtdarsTMeJjy1zcXXXAgXXa_!!603964020-0-daren.jpg_250x250q90s200.jpg',
        'https://gw.alicdn.com/tfscom/i3/1635378022/TB2plKDbFXXXXaTXpXXXXXXXXXX-1635378022.jpg_250x250q90s200.jpg'
      ],
      count: 3576,
    }, {
      type: 'floor',
      title: '轻奢风来袭，皮艺床打造典雅居室',
      desc: '对于追求生活高品质感的小伙伴来说，皮艺家具是展现其高格调的途径之一。想要营造出奢华质感的卧室环境，大气庄重的皮床当然是不错的选择。特别是简欧风或是美式古典风格的家居环境，如果配以皮艺床简直就是点睛之笔',
      pictures: [
        'https://gw.alicdn.com/imgextra/i2/787557947/TB2erNKawoQMeJjy0FoXXcShVXa_!!787557947-0-beehive-scenes.jpg_250x250q90s200.jpg',
        'https://gw.alicdn.com/imgextra/i1/787557947/TB2KANyaBUSMeJjy1zkXXaWmpXa_!!787557947-0-beehive-scenes.jpg_250x250q90s200.jpg',
        'https://gw.alicdn.com/imgextra/i3/787557947/TB2lwdGayERMeJjy0FcXXc7opXa_!!787557947-0-beehive-scenes.jpg_250x250q90s200.jpg'
      ],
      count: 36,
    }
  ],
  card: [
    {
      type: 'card',
      poster: 'http://gw.alicdn.com/tps/i4/1611893164/TB2t4mtXJqUQKJjSZFIXXcOkFXa_!!0-juitemmedia.jpg_320x320q80s150.jpg',
      title: '澳洲牛排10份装送刀叉酱料黄油',
      subtitle1: '送平底锅前3000仅78',
      subtitle2: '私厨经典 镇店套餐',
      got: 173,
      progress: 35,
      price: {
        real: 108,
        fake: 240.00
      }
    }, {
      type: 'card',
      poster: 'http://gw.alicdn.com/tps/i2/2838892713/TB2ma39aqmgSKJjSsphXXcy1VXa_!!0-juitemmedia.jpg_320x320q80s150.jpg',
      title: 'HUAWEI P10',
      subtitle1: '买赠好礼6期免息',
      subtitle2: '6期免息',
      got: 996,
      progress: 89,
      price: {
        real: 3488,
        fake: 3488.00
      }
    }, {
      type: 'card',
      poster: 'http://gw.alicdn.com/tps/i3/902257410/TB2pzypfU3IL1JjSZFMXXajrFXa_!!0-juitemmedia.jpg_320x320q80s150.jpg',
      title: '海宁真皮皮衣男绵羊皮夹克外套',
      subtitle1: '店内领券下单438',
      subtitle2: '限送500双皮手套',
      got: 296,
      progress: 16,
      price: {
        real: 538,
        fake: 3080.00
      }
    }
  ]
}

// generate list data
function createListData (order) {
  var array = []
  var list = order.split(/[\s,]+/)
  for (var i = 0; i < list.length; ++i) {
    var candidates = dataset[list[i]]
    if (candidates) {
      var idx = Math.floor(Math.random() * candidates.length)
      array.push(candidates[idx])
    }
  }
  return array
}

// var order = 'tab,apps,card'
var order = 'tab,apps,apps,A,card,A,floor,floor'
  + ',tab,apps,apps,A,card,A,floor,floor'
  + ',tab,apps,apps,A,card,A,floor,floor'
  + ',tab,apps,apps,A,card,A,floor,floor'
  + ',tab,apps,apps,A,card,A,floor,floor'

new Vue({
  el: 'body',
  components: { line: Line, floor: Floor, card: Card, 'tab-header': TabHeader, appList: AppList },
  data: function () {
    return { listData: createListData(order) }
  },
  render: function (h) {
    return h('div', {}, [h('recycle-list', {
        appendAsTree: true,
        style: { backgroundColor: '#F5F5F5' },
        attrs: { append: "tree", listData: this.listData, templateKey: 'type', alias: 'item', index: 'index' }
      }, [
        h('cell-slot', { attrs: { templateType: 'A' } }, [
          h('div', { style: { backgroundColor: '#EEEEEE' } }, [
            h('line', { attrs: { name: { '@binding': 'item.name' }, kind: { '@binding': 'item.kind' } } })
          ])
        ]),
        h('cell-slot', { attrs: { templateType: 'tab' } }, [
          h('tab-header', { attrs: { tabs: { '@binding': 'item.tabs' } } })
        ]),
        h('cell-slot', { attrs: { templateType: 'floor' } }, [
          h('floor', { attrs: { floor: { '@binding': 'item' } } })
        ]),
        h('cell-slot', { attrs: { templateType: 'card' } }, [
          h('card', { attrs: { card: { '@binding': 'item' }, index: { '@binding': 'index' } } })
        ]),
        h('cell-slot', { attrs: { templateType: 'apps' } }, [
          h('app-list', { attrs: { apps: { '@binding': 'item.apps' } } })
        ])
      ])
    ])
  }
})
