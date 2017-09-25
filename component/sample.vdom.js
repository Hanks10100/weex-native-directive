{
  type: 'recycle-list',
  attr: {
    append: 'tree',
    templateKey: 'type',
    alias: 'item'
  },
  children: [{
    type: 'cell-slot',
    attr: { templateType: 'A' },
    children: [{
      type: 'text',
      attr: {
        value: ['name: ', { '@binding': 'item.name' }]
      }
    }, {
      type: 'text',
      attr: {
        value: ['(', { '@binding': 'item.kind' }, ')']
      }
    }]
  }]
}
