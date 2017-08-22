{
  type: 'div',
  children: [{
      type: 'text',
      attr: {
        value: 'static'
      }
    }, {
      type: 'text',
      attr: {
        value: { '@binding': 'dynamic' }
      }
    }, {
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
}