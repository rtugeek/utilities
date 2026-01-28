import { Widget, WidgetKeyword } from '@widget-js/core'

const NoteWidget = new Widget({
  name: 'cn.widgetjs.widgets.note',
  title: { 'zh-CN': '快速便签', 'en-US': 'Quick Note' },
  description: { 'zh-CN': '便捷的桌面便签，随时记录提醒。', 'en-US': 'Quick desktop notes and reminders at a glance.' },
  keywords: [WidgetKeyword.RECOMMEND],
  categories: ['utilities'],
  lang: 'zh-CN',
  width: 4,
  height: 4,
  minWidth: 4,
  maxWidth: 4,
  minHeight: 4,
  maxHeight: 6,
  socialLinks: [
    { name: 'github', link: 'https://github.com/rtugeek/stocks-desktop' },
  ],
  previewImage: '/images/preview_note.png',
  path: '/widget/note',
})

export default NoteWidget
