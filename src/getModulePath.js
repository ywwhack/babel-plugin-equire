const moduleGroups = require('./moduleGroups')

const modulesMap = {}
for (let group in moduleGroups) {
  moduleGroups[group].forEach(moduleName => {
    modulesMap[moduleName] = group
  })
}

module.exports = function (moduleName) {
  return `echarts/lib/${modulesMap[moduleName]}/${moduleName}`
}
