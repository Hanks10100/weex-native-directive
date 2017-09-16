const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const WeexRuntime = require('weex-js-runtime')
const Vue = require('weex-vue-framework')
const { compile } = require('weex-template-compiler')

function toFunction (content) {
  return `function () { ${content} }`
}

function readFile (name) {
  return fs.readFileSync(path.resolve('./examples/', name), 'utf8')
}

function omitUseless (object) {
  if (object !== null && typeof object === 'object') {
    delete object.ref
    for (const key in object) {
      if (Object.keys(object[key] || {}).length < 1) {
        delete object[key]
      }
      omitUseless(object[key])
    }
  }
  return object
}

function execute (code) {
  WeexRuntime.config.frameworks = { Vue }
  const context = WeexRuntime.init(WeexRuntime.config)
  context.registerModules({
    timer: ['setTimeout', 'setInterval']
  })
  return new Promise(resolve => {
    const id = String(Date.now() * Math.random())
    const instance = context.createInstance(id, code)
    setTimeout(() => {
      resolve(omitUseless(instance.document.body.toJSON()))
      context.destroyInstance(id)
    }, 10)
  })
}

function compileAndExecute (template, additional = '') {
  const { render, staticRenderFns } = compile(
    `<recycle-list>
      <cell-slot>${template}</cell-slot>
    </recycle-list>`
  )
  // console.log(render)
  return execute(`
    // { "framework": "Vue" }
    Vue.config.silent = true
    new Vue({
      el: '#whatever',
      render: ${toFunction(render)},
      staticRenderFns: [${staticRenderFns.map(toFunction).join(',')}],
      ${additional}
    })
  `).then($root => {
    return $root.children[0].children[0]
  })
}

function createTestSuit (name) {
  return done => {
    const source = readFile(`${name}.vue`)
    const target = readFile(`${name}.vdom.js`)
    compileAndExecute(source).then($root => {
      expect($root).to.deep.equal(eval(`(${target})`))
      done()
    }).catch(done)
  }
}

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
