{
  type: 'div',
  event: [{
    type: 'click',
    args: [{ '@binding': 'index' }]
  }],
  children: [{
      type: 'text',
      event: [{
        type: 'appear',
        args: [
          { '@binding': 'index' },
          'static',
          { '@binding': 'type' },
          { '@binding': '$event' }
        ]
      }],
      attr: { value: 'Button' }
    }
  ]
}