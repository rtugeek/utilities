import { Widget, WidgetKeyword } from '@widget-js/core'

const ForexWidget = new Widget({
  name: 'widgetjs.cn.utilities.forex',
  title: { 'zh-CN': '汇率换算' },
  description: { 'zh-CN': '每分钟刷新一次' },
  keywords: [WidgetKeyword.RECOMMEND],
  categories: ['utilities'],
  lang: 'zh-CN',
  width: 3,
  height: 3,
  previewImage: '/images/preview_forex.png',
  path: '/widget/forex'
})

export default ForexWidget
