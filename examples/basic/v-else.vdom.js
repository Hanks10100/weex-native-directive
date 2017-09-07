{
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
}