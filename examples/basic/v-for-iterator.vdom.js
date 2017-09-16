{
  type: 'div',
  children: [
    {
      type: 'text',
      attr: {
        '[[repeat]]': {
          '@expression': 'list',
          '@index': 'index',
          '@alias': 'item'
        },
        value: {
          '@binding': 'item.label'
        }
      }
    }, {
      type: 'text',
      attr: {
        '[[repeat]]': {
          '@expression': 'object',
          '@alias': 'item',
          '@key': 'key',
          '@index': 'index'
        },
        value: {
          '@binding': 'key'
        }
      }
    }
  ]
}
