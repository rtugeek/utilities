import { Widget, WidgetKeyword } from '@widget-js/core'

const ForexWidget = new Widget({
  name: 'widgetjs.cn.utilities.forex',
  title: { 'zh-CN': '汇率换算','en-US': 'Forex' },
  description: { 'zh-CN': '每分钟刷新一次','en-us': 'Refresh every minute' },
  keywords: [WidgetKeyword.RECOMMEND],
  categories: ['utilities'],
  lang: 'zh-CN',
  width: 3,
  height: 3,
  previewImage: '/images/preview_forex.png',
  path: '/widget/forex'
})

export default ForexWidget
