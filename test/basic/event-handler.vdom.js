{
  type: 'div',
  event: [{
    type: 'click',
    params: [{ '@binding': 'index' }]
  }],
  children: [{
      type: 'text',
      event: [{
        type: 'appear',
        params: [
          { '@binding': 'index' },
          "'static'",
          { '@binding': 'type' },
          { '@binding': '$event' }
        ]
      }],
      attr: { value: 'Button' }
    }
  ]
}
