{
  type: 'div',
  children: [{
      type: 'image',
      attr: {
        '[[match]]': 'sourceA',
        src: { '@binding': 'sourceA' }
      }
    }, {
      type: 'image',
      attr: {
        '[[match]]': '!(sourceA) && (sourceB)',
        src: { '@binding': 'sourceB' }
      }
    }, {
      type: 'image',
      attr: {
        '[[match]]': '!(!(sourceA) && (sourceB))',
        src: { '@binding': 'placeholder' }
      }
    }
  ]
}
