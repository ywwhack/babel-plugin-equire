// eslint-disable-next-line
const echarts = equire([
  'line',
  'bar'
])

export default echarts

// will transform to below
// import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/line';

// export default echarts;
