import { WidgetPackage } from '@widget-js/core'

export default new WidgetPackage({
  author: 'Neo Fu',
  description: {
    'zh-CN': '内置工具组件包',
  },
  hash: true,
  homepage: '',
  name: 'widgetjs.cn.utilities',
  title: {
    'zh-CN': '常用工具',
  },
  devOptions: {
    folder: './src/widgets/',
  },
  remote: {
    entry: 'https://widgetjs.cn/utilities',
    hash: true,
    base: '/utilities',
    hostname: 'widgetjs.cn',
  },
  remoteEntry: 'https://widgetjs.cn/utilities',
  remotePackage: 'https://widgetjs.cn/utilities/widget.json',
})
