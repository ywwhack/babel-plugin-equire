const getModulePath = require('./getModulePath')

const ECHARTS_SYMBOL = 'e_echarts'

function buildEchartsVariable (t) {
  return t.VariableDeclaration('let', [
    t.VariableDeclarator(
      t.Identifier(ECHARTS_SYMBOL),
      null
    )
  ])
}

function buildEcharts (init, path, { types: t }) {
  const elements = init.arguments[0].elements
  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i]
    path.insertAfter(
      t.ImportDeclaration(
        [],
        t.StringLiteral(getModulePath(element.value))
      )
    )
  }
  path.replaceWith(t.ImportDeclaration(
    [
      t.ImportDefaultSpecifier(
        getVariableNode(path)
      )
    ],
    t.StringLiteral('echarts/lib/echarts')
  ))
}

function buildEchartsAsync (init, path, babel) {
  const { elements } = init.arguments[0]
  const arrayExpression = init.arguments[0]
  let node
  if (arrayExpression.leadingComments &&
    arrayExpression.leadingComments[0].value.indexOf('require.ensure')) {
    node = buildRequireEnsure(path, elements, babel)
  } else {
    node = buildImport(path, elements, babel)
  }
  path.insertBefore(buildEchartsVariable(babel.types))
  path.replaceWith(node)
}

function buildRequireEnsure (path, elements, { types: t, template }) {
  const requiredModules = elements.map(element => `'${getModulePath(element.value)}'`).join(',')
  const executeModules = elements.map(element => `require('${getModulePath(element.value)}')`).join('\n')
  const node = template(`
    function ${getVariableNode(path).name} () {
      if (${ECHARTS_SYMBOL}) return Promise.resolve(${ECHARTS_SYMBOL})
      return new Promise(resolve => {
        require.ensure([${requiredModules}], require => {
          const _echarts = require('echarts/lib/echarts')
          ${executeModules}
          ${ECHARTS_SYMBOL} = _echarts
          resolve(_echarts)
        })
      })
    }
  `)()
  return node
}

function buildImport (path, elements, { types: t, template }) {
  const requiredModules = elements
    .map(element => `import(/* webpackChunkName: "echarts" */ '${getModulePath(element.value)}')`)
    .join(',')
  const node = template(`
    function ${getVariableNode(path).name} () {
      if (!${ECHARTS_SYMBOL}) {
        ${ECHARTS_SYMBOL} = import(/* webpackChunkName: "echarts" */ 'echarts/lib/echarts')
          .then(echarts => {
            return Promise.all([
              echarts,
              ${requiredModules}
            ]).then(([echarts]) => echarts)
          })
      }
    
      return ${ECHARTS_SYMBOL}
    }
  `, { plugins: ['dynamicImport'], preserveComments: true })()
  return node
}

function getVariableNode (path) {
  return path.node.declarations[0].id
}

function isEquire (node) {
  if (!node || !node.callee) return false

  const name = node.callee.name
  return name === 'equire' || name === 'equireAsync'
}

module.exports = function (babel) {
  const { types: t } = babel
  return {
    name: 'equire',
    visitor: {
      VariableDeclaration (path) {
        const { node } = path
        // only support one declarations when use this plugin
        const { init } = node.declarations[0]
        if (!isEquire(init)) return

        if (t.isCallExpression(init)) {
          if (init.callee.name === 'equire') {
            buildEcharts(init, path, babel)
          } else if (init.callee.name === 'equireAsync') {
            buildEchartsAsync(init, path, babel)
          }
        }
      }
    }
  }
}
