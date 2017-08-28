// { "framework": "Vanilla" }

const uniqueId = (function(){
  let count = Math.floor(Math.random() * 6666 + 1000)
  return () => String(count++)
})()

function sendNode (data, vdom) {
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
        listData: data,
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

const data = [
  { index: 0, type: 'A' },
  { index: 1, type: 'A' },
  { index: 2, type: 'A' },
]
sendNode(data, {
  ref: uniqueId(),
  type: 'div',
  event: [{
    type: 'click',
    args: [{ '@binding': 'index' }]
  }],
  children: [{
      ref: uniqueId(),
      type: 'text',
      event: [{
        type: 'appear',
        args: [
          { '@binding': 'index' },
          'static',
          { '@binding': 'type' },
          { '@binding': '$event' }
        ]
      }],
      attr: { value: 'Button' }
    }
  ]
})