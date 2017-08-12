// eslint-disable-next-line
const initEcharts = equireAsync([
  'line',
  'bar'
])

export default initEcharts

// will transform to below
// let e_echarts;

// function initEcharts() {
//   if (!e_echarts) {
//     e_echarts = import( /* webpackChunkName: "echarts" */'echarts/lib/echarts')
//       .then(echarts => {
//         return Promise.all([
//           echarts,
//           import( /* webpackChunkName: "echarts" */'echarts/lib/chart/line'),
//           import( /* webpackChunkName: "echarts" */'echarts/lib/chart/bar')
//         ]).then(([echarts]) => echarts);
//       });
//   }

//   return e_echarts;
// }

// export default initEcharts;
