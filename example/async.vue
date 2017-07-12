<template>
  <div style="width: 800px; height: 300px;" ref="chart"></div>
</template>

<script>
import echartsPromise from './initEchartsAsync'

export default {
  mounted () {
    echartsPromise.then(echarts => {
      const chartInstance = echarts.init(this.$refs.chart)
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      chartInstance.setOption(option)
    })
  }
}
</script>
