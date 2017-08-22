{
  type: 'div',
  children: [{
      type: 'text',
      attr: {
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