const fs = require('fs')
const path = require('path')

const ROOT_PATH = process.cwd()
const BASE_PATH = path.resolve(ROOT_PATH, 'node_modules/echarts/lib')
const MODULES_PATH = path.resolve(ROOT_PATH, 'src/moduleGroups.js')
const TRAVALSE_DIRS = ['chart', 'component']

console.log('generating modules.js file...')
let output = ''
TRAVALSE_DIRS.forEach(dir => {
  const files = fs.readdirSync(path.resolve(BASE_PATH, dir))
  output += `exports.${dir} = [`
  files.forEach(file => {
    if (file.slice(-3) === '.js') {
      output += `\n  '${file.slice(0, -3)}',`
    }
  })
  // remove last array comma
  output = output.slice(0, -1)
  output += `\n]\n`
})

fs.writeFileSync(MODULES_PATH, output)
console.log('modules.js file generated success!')
