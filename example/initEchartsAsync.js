// eslint-disable-next-line
const echarts = equireAsync([
  'line',
  'bar'
])

export default echarts

// will transform to below
// const echarts = new Promise(resolve => {
//   require.ensure([], require => {
//     const _echarts = require('echarts/lib/echarts')

//     require('echarts/lib/chart/line')

//     require('echarts/lib/chart/bar')

//     resolve(_echarts)
//   })
// })

// export default echarts
