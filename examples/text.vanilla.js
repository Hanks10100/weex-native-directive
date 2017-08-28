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
  { type: 'A', dynamic: 'number', two: '2', four: '4' },
  { type: 'A', dynamic: '数字', two: '二', four: '四' }
]
sendNode(listData, {
  type: 'div',
  children: [{
      type: 'text',
      attr: {
        value: 'static'
      }
    }, {
      type: 'text',
      attr: {
        value: { '@binding': 'dynamic' }
      }
    }, {
      type: 'text',
      attr: {
        value: [
          'one ',
          { '@binding': 'two' },
          ' three ',
          { '@binding': 'four' },
          ' five'
        ]
      }
    }
  ]
})
