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
  return fs.readFileSync(path.resolve(__dirname, name), 'utf8')
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

module.exports = {
  expect,
  execute,
  readFile,
  createTestSuit,
  compileAndExecute
}
