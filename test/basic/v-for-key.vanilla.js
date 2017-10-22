// { "framework": "Vanilla" }

const uniqueId = (function(){
  let count = Math.floor(Math.random() * 6666 + 1000)
  return () => String(count++)
})()

function sendNode (listData, vdom) {
  const send = typeof id === 'undefined'
    ? task => sendTasks([task], -1)
    : task => sendTasks(id, [task], -1)

  send({
    module: 'dom',
    method: 'createBody',
    args: [{
      ref: '_root',
      type: 'recycle-list',
      attr: {
        listData: listData,
        templateKey: 'type'
      },
      children: [{
        ref: uniqueId(),
        type: 'cell-slot',
        templateType: 'A',
        children: [vdom]
      }]
    }]
  })
  send({ module: 'dom', method: 'createFinish', args: [] })
}

const listData = [{
  type: 'A',
  group: [{ name: 'first' }, { name: 'second' }]
}, {
  type: 'A',
  group: [{ name: '第一' }, { name: '第二' }]
}]
sendNode(listData, {
  type: 'list',
  children: [{
      type: 'cell',
      attr: {
        '[[repeat]]': {
          '@expression': 'group',
          '@index': 'index',
          '@alias': 'item'
        },
        append: 'tree',
        key: {
          '@binding': 'index'
        }
      },
      children: [{
        type: 'text',
        attr: {
          value: {
            '@binding': 'item.name + index'
          }
        }
      }]
    }
  ]
})
