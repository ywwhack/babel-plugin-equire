[![Build Status](https://travis-ci.org/ywwhack/babel-plugin-equire.svg?branch=master)](https://travis-ci.org/ywwhack/babel-plugin-equire)

按需加载 echarts 模块

当我们只需要 echarts 的 line 和 tooltip 模块的时候，我们会这么写：

```
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
```
当引入了这个插件后，我们只需要这个写：

```
// eslint-disable-next-line
const echarts = equire([
  'line',
  'tooltip'
])
```
这个插件会自动帮我们转化为上面的形式

## 安装
```shell
npm i babel-plugin-equire -D
```
然后，在 `.babelrc` 文件中添加该插件

```
{
  "plugins": [
  	 // other plugins
  	 ...
  	 
    "equire"
  ]
}
``` 

## 用法
新建一个文件 initEcharts.js 用于初始化 echarts 模块，然后编写如下代码：

```
@/src/utils/initEcharts.js

// eslint-disable-next-line
const echarts = equire([
  'line',
  'tooltip'
])

export default echarts
```
在需要用到 echarts 的地方引入上面的 initEcharts.js 文件

```
import echarts from '@/src/utils/initEcharts'
```
这样，最后打包出来的文件就只有包含 echarts 的核心模块和 line/bar 两个图表模块

## 配合 code-splitting
将上面文件的 `equire` 替换为 `equireAsync`，这个时候 `equireAsync()` 返回的是一个函数，函数执行后会返回一个 `promise` 对象

```
// eslint-disable-next-line
const initEcharts = equireAsync([
  'line',
  'tooltip'
])

export default initEcharts
```
在其他文件中使用：

```
import initEcharts from '@/src/utils/initEcharts'

initEcharts()
  .then(echarts => {
    // do somthing with echarts
  })
```

完整用例可以参考 [同步加载](example/basic.vue) [异步加载](example/async.vue)

## API
引入这个插件后，在 babel 编译时会注入两个全局函数：**equire** 和 **equireAsync**
### equire(modules)
- 同步加载模块，返回 echarts 对象
- 参数 modules 是一个数组，传入需要按需加载的模块名称，具体名称参见转化规则

### equireAsync(modules)
- 异步加载一个模块，返回一个初始化函数
- 参数 modules 是一个数组，传入需要按需加载的模块名称，具体名称参见转化规则

## 转化规则
下面列出了所有 `chart` 和 `component` 的模块，插件内部会根据这些模块名称转成相应的路径，你也可以直接指定路径来引入模块，如 `zrender/lib/vml/vml`，这个时候会直接使用该路径来引入模块

```
// @chart

  'bar',
  'boxplot',
  'candlestick',
  'chord',
  'custom',
  'effectScatter',
  'funnel',
  'gauge',
  'graph',
  'heatmap',
  'line',
  'lines',
  'map',
  'parallel',
  'pictorialBar',
  'pie',
  'radar',
  'sankey',
  'scatter',
  'themeRiver',
  'treemap'
  
// @component

  'angleAxis',
  'axis',
  'axisPointer',
  'brush',
  'calendar',
  'dataZoom',
  'dataZoomInside',
  'dataZoomSelect',
  'geo',
  'graphic',
  'grid',
  'gridSimple',
  'legend',
  'markArea',
  'markLine',
  'markPoint',
  'parallel',
  'parallelAxis',
  'polar',
  'radar',
  'radiusAxis',
  'single',
  'singleAxis',
  'timeline',
  'title',
  'toolbox',
  'tooltip',
  'visualMap',
  'visualMapContinuous',
  'visualMapPiecewise'
```