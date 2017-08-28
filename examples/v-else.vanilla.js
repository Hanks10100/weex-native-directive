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

const listData = [
  { type: 'A', source: 'src/image.png' },
  { type: 'A', placeholder: 'placeholder.png' }
]
sendNode(listData, {
  type: 'div',
  children: [{
      type: 'image',
      attr: {
        '[[match]]': 'source',
        src: { '@binding': 'source' }
      }
    }, {
      type: 'image',
      attr: {
        '[[match]]': '!(source)',
        src: { '@binding': 'placeholder' }
      }
    }
  ]
})
