/* global it expect:true */
const babel = require('babel-core')
const plugin = require('../')

function transform (source) {
  return babel.transform(source, { plugins: [plugin] })
}

it('equire() should works', () => {
  const source = `
    const echarts = equire([
      'line',
      'bar'
    ])
  `
  const { code } = transform(source, { plugins: [plugin] })
  expect(code).toMatchSnapshot()
})

it('equireAsync() should works', () => {
  const source = `
    const initEcharts = equireAsync([
      'line',
      'bar'
    ])
  `
  const { code } = transform(source, { plugins: [plugin] })
  expect(code).toMatchSnapshot()
})
