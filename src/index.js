const getModulePath = require('./getModulePath')

module.exports = function ({ types: t }) {
  return {
    name: 'equire',
    visitor: {
      VariableDeclaration (path) {
        const { node } = path
        const { init } = node.declarations[0]
        if (t.isCallExpression(init) && init.callee.name === 'equire') {
          init.arguments[0].elements.forEach(element => {
            path.insertAfter(
              t.ImportDeclaration(
                [],
                t.StringLiteral(getModulePath(element.value))
              )
            )
          })
          path.replaceWith(t.ImportDeclaration(
            [
              t.ImportDefaultSpecifier(
                t.Identifier('echarts')
              )
            ],
            t.StringLiteral('echarts/lib/echarts')
          ))
        }
      }
    }
  }
}
