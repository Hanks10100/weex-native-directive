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

function createContext () {
  const config = Object.assign({ frameworks: { Vue } }, WeexRuntime.config)
  const context = WeexRuntime.init(config)
  context.registerModules({
    timer: ['setTimeout', 'setInterval']
  })
  return context
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

function compileAndExecute (template, additional) {
  const context = createContext()
  return new Promise(resolve => {
    const id = String(Date.now() + Math.random())
    const { render, staticRenderFns } = compile(template)
    const instance = context.createInstance(id, `
      // { "framework": "Vue" }
      new Vue({
        el: '#whatever',
        render: ${toFunction(render)},
        staticRenderFns: [${staticRenderFns.map(toFunction).join(',')}],
        ${additional}
      })
    `)
    setTimeout(() => {
      resolve(omitUseless(instance.document.body.toJSON()))
    }, 10)
  })
}

function createTestSuit (name) {
  return done => {
    const source = readFile(`${name}.vue`)
    const target = readFile(`${name}.vdom.js`)
    compileAndExecute(source).then($root => {
      // console.log($root)
      // console.log(target)
      expect($root).to.deep.equal(eval(`(${target})`))
      done()
    }).catch(done)
  }
}

describe('Compiler', () => {
  it('compiler works', createTestSuit('_'))
})

describe.skip('Vue examples', () => {
  it('binding in text node', createTestSuit('text'))
  it('binding in attributes', createTestSuit('attrs'))
})