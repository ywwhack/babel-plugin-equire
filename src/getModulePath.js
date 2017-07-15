const moduleGroups = require('./moduleGroups')

const modulesMap = {}
for (let group in moduleGroups) {
  moduleGroups[group].forEach(moduleName => {
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
