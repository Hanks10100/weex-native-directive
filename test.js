const {
  expect,
  execute,
  readFile,
  createTestSuit,
  compileAndExecute
} = require('./test.util')

describe('Compiler', () => {
  it('compiler works', createTestSuit('_'))
})

describe('Vue examples', () => {
  it('binding text node', createTestSuit('basic/text'))
  it('binding attributes', createTestSuit('basic/attrs'))
  it('v-bind', createTestSuit('basic/v-bind'))
  it('v-if', createTestSuit('basic/v-if'))
  it('v-else', createTestSuit('basic/v-else'))
  it('v-else-if', createTestSuit('basic/v-else-if'))
  it('v-for', createTestSuit('basic/v-for'))
  it('v-for with iterator', createTestSuit('basic/v-for-iterator'))
  it('v-for with iterator and key', createTestSuit('basic/v-for-key'))
  it('v-on', done => {
    const source = readFile(`basic/v-on.vue`)
    const target = readFile(`basic/v-on.vdom.js`)
    compileAndExecute(source, `
      methods: {
        handler: function () {},
        move: function () {}
      }
    `).then($root => {
      expect($root).to.deep.equal(eval(`(${target})`))
      done()
    }).catch(done)
  })
})

describe.skip('Pending examples', () => {
  it('event handler', done => {
    const source = readFile(`basic/event-handler.vue`)
    const target = readFile(`basic/event-handler.vdom.js`)
    compileAndExecute(source, `
      methods: {
        onclick: function () {},
        onappear: function () {}
      }
    `).then($root => {
      expect($root).to.deep.equal(eval(`(${target})`))
      done()
    }).catch(done)
  })
})

describe.skip('Component examples', () => {
  it('sample', done => {
    const source = readFile(`component/sample.vue.js`)
    const target = readFile(`component/sample.vdom.js`)
    execute(source).then($root => {
      delete $root.attr.listData
      expect($root).to.deep.equal(eval(`(${target})`))
      done()
    }).catch(done)
  })
})
