import {
  Widget,
  WidgetKeyword,
} from '@widget-js/core'

// 组件关键词
const WaterReminderWidget = new Widget({
  name:'widgetjs.cn.utilities.water_reminder',
  title:{ 'zh-CN': '喝水提醒' },
  description:{ 'zh-CN': '每天N杯水，养成好习惯' },
  keywords:[WidgetKeyword.RECOMMEND],
  lang: 'zh-CN',
  previewImage: '/images/preview_water_reminder.png',
  width: 2,
  categories: ['utilities'],
  height: 2,
  backgroundThrottling: false,
  minWidth: 2,
  maxWidth: 2,
  minHeight: 2,
  maxHeight: 2,
  path: '/widget/water_reminder',
  configPagePath: '/widget/config/water_reminder',
})

export default WaterReminderWidget
