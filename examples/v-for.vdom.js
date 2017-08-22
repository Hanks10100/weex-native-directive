{
  type: 'div',
  children: [{
      type: 'text',
      attr: {
        '[[repeat]]': {
          '@expression': 'list',
          '@label': 'item'
        },
        value: {
          '@binding': 'item.label'
        }
      }
    }
  ]
}