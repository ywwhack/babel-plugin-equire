// eslint-disable-next-line
const initEcharts = equireAsync([
  'line',
  'bar'
])

export default initEcharts

// will transform to below
// const echartsPromise = new Promise(resolve => {
//   require.ensure([], require => {
//     const _echarts = require('echarts/lib/echarts')

//     require('echarts/lib/chart/line')

//     require('echarts/lib/chart/bar')

//     resolve(_echarts)
//   })
// })

// export default echartsPromise
