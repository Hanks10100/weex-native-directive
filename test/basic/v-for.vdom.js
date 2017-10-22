{
  type: 'div',
  children: [{
      type: 'text',
      attr: {
        '[[repeat]]': {
          '@expression': 'list',
          '@alias': 'item'
        },
        value: {
          '@binding': 'item.label'
        }
      }
    }
  ]
}
