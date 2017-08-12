// eslint-disable-next-line
const initEcharts = equireAsync([
  'line',
  'bar'
])

export default initEcharts

// will transform to below
// let e_echarts;

// function initEcharts() {
//   if (e_echarts) return Promise.resolve(e_echarts);
//   return new Promise(resolve => {
//     require.ensure(['echarts/lib/chart/line', 'echarts/lib/chart/bar'], require => {
//       const _echarts = require('echarts/lib/echarts');

//       require('echarts/lib/chart/line');

//       require('echarts/lib/chart/bar');

//       e_echarts = _echarts;
//       resolve(_echarts);
//     });
//   });
// }

// export default initEcharts;
