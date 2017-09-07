{
  type: 'div',
  children: [{
      type: 'text',
      attr: {
        lines: '3',
        dataName: { '@binding': 'title' }
      }
    },
    {
      type: 'image',
      attr: {
        src: { '@binding': 'picture.source' }
      }
    }
  ]
}