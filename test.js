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

function compileAndExecute (template, additional = '') {
  WeexRuntime.config.frameworks = { Vue }
  const context = WeexRuntime.init(WeexRuntime.config)
  context.registerModules({
    timer: ['setTimeout', 'setInterval']
  })
  return new Promise(resolve => {
    const id = String(Date.now() * Math.random())
    const { render, staticRenderFns } = compile(
      `<recycle-list>
        <cell-slot>${template}</cell-slot>
      </recycle-list>`
    )

    const instance = context.createInstance(id, `
      // { "framework": "Vue" }
      Vue.config.silent = true
      new Vue({
        el: '#whatever',
        render: ${toFunction(render)},
        staticRenderFns: [${staticRenderFns.map(toFunction).join(',')}],
        ${additional}
      })
    `)

    setTimeout(() => {
      resolve(omitUseless(instance.document.body.children[0].children[0].toJSON()))
      context.destroyInstance(id)
    }, 10)
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
  it('binding text node', createTestSuit('text'))
})

describe.skip('Pending examples', () => {

  it('binding attributes', createTestSuit('attrs'))
  it('v-bind', createTestSuit('v-bind'))
  it('v-if', createTestSuit('v-if'))
  it('v-else', createTestSuit('v-else'))
  it('v-for', createTestSuit('v-for'))
  it('v-for with key', createTestSuit('v-for-key'))

  it('v-on', done => {
    const source = readFile(`v-on.vue`)
    const target = readFile(`v-on.vdom.js`)
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

  it('event handler', done => {
    const source = readFile(`event-handler.vue`)
    const target = readFile(`event-handler.vdom.js`)
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
