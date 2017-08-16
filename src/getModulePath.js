const echartsModules = require('echarts-modules')

const modulesMap = {}
const groups = ['chart', 'component']
for (let group of groups) {
  echartsModules[group].forEach(moduleName => {
    modulesMap[moduleName] = group
  })
}

module.exports = function (moduleName) {
  if (!modulesMap[moduleName]) {
    // user custom path
    return moduleName
  } else {
    return `echarts/lib/${modulesMap[moduleName]}/${moduleName}`
  }
}
