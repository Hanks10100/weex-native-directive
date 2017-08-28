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
          { '@binding': 'item.name' },
          { '@binding': '$event' }
        ]
      }],
      attr: { value: 'Button' }
    }
  ]
}