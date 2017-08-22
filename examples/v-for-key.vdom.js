{
  type: 'list',
  children: [{
      type: 'cell',
      attr: {
        '[[repeat]]': {
          '@expression': 'list',
          '@index': 'index',
          '@label': 'item'
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
}