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

var order = 'A,apps,apps,A,floor,floor,floor,floor'
  + ',A,apps,apps,A,floor,floor,floor,floor'
  + ',A,apps,apps,A,floor,floor,floor,floor'
  + ',A,apps,apps,A,floor,floor,floor,floor'
  + ',A,apps,apps,A,floor,floor,floor,floor'
  + ',A,apps,apps,A,floor,floor,floor,floor'
  + ',A,apps,apps,A,floor,floor,floor,floor'
  + ',A,apps,apps,A,floor,floor,floor,floor'
  + ',A,apps,apps,A,floor,floor,floor,floor'
  + ',A,apps,apps,A,floor,floor,floor,floor'

new Vue({
  el: 'body',
  components: { line: Line, floor :Floor, appList: AppList },
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
        h('cell-slot', { attrs: { templateType: 'floor' } }, [
          h('floor', { attrs: { floor: { '@binding': 'item' } } })
        ]),
        h('cell-slot', { attrs: { templateType: 'apps' } }, [
          h('app-list', { attrs: { apps: { '@binding': 'item.apps' } } })
        ])
      ])
    ])
  }
})
