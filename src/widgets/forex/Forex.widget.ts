import { Widget, WidgetKeyword } from '@widget-js/core'

const ForexWidget = new Widget({
  name: 'widgetjs.cn.utilities.forex',
  title: { 'zh-CN': '汇率换算' },
  description: { 'zh-CN': '每分钟刷新一次' },
  keywords: [WidgetKeyword.RECOMMEND],
  categories: [],
  lang: 'zh-CN',
  width: 3,
  height: 3,
  previewImage: '修改为组件预览图地址',
  path: '/widget/forex',
  configPagePath: '/widget/forex/config?transparent=false&frame=true&width=500&height=500',
})

export default ForexWidget
