{
  type: 'div',
  event: [{
    type: 'click',
    params: [{ '@binding': 'index' }]
  }],
  children: [{
    type: 'text',
    event: [{ type: 'disappear' }]
  }, {
    type: 'text',
    event: [{
      type: 'appear',
      params: [
        { '@binding': 'index' },
        { '@binding': 'type' }
      ]
    }],
    attr: { value: 'Button' }
  }]
}
