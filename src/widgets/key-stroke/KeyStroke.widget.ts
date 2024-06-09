import { BackgroundWidget, WidgetKeyword } from '@widget-js/core';

const KeyStrokeWidget = new BackgroundWidget({
  name: 'widgetjs.cn.utilities.key_stroke',
  title: {'zh-CN': '键盘演示'},
  description: {'zh-CN': '在屏幕显示每一次快捷键敲击'},
  keywords: [WidgetKeyword.RECOMMEND],
  lang: 'zh-CN',
  categories: ['utilities'],
  previewImage: '/images/preview_keystroke.png',
  permissions: ['keyboard'],
  path: '/widget/key_stroke'
});

export default KeyStrokeWidget;
