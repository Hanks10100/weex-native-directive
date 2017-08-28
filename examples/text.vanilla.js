// { "framework": "Vanilla" }

const uniqueId = (() => {
  let count = Math.floor(Math.random() * 6666 + 1000)
  return () => String(count++)
})()

const listData = []

sendTasks(id, [{
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
      attr: {},
      children: [{
        type: 'div',
        children: [{
            ref: uniqueId(),
            type: 'text',
            attr: {
              value: 'static'
            }
          }, {
            ref: uniqueId(),
            type: 'text',
            attr: {
              value: { '@binding': 'dynamic' }
            }
          }, {
            ref: uniqueId(),
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
      }]
    }]
  }]
}])

sendTasks(id, [{ module: 'dom', method: 'createFinish', args: [] }], -1)