{
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

        // need discuss
        // key: {
        //   '@binding': 'index'
        // }
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
