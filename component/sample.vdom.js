({
  type: 'div',
  style: { justifyContent: 'center' },
  attrs: {
    '@isComponentRoot': true,
    '@componentProps': {
      content: { '@binding': 'item.xxx' }
    }
  },
  children: [{
    type: 'text',
    style: { 'fontSize': 80, 'textAlign': 'center' },
    attr: {
      value: { '@binding': 'content' }
    }
  }]
})
