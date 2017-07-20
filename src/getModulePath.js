const echartsModules = require('echarts-modules')

const modulesMap = {}
for (let group in echartsModules) {
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
