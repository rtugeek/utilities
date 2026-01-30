import { BackgroundWidget, DeployMode, WidgetKeyword } from '@widget-js/core'

const ConvertWidget = new BackgroundWidget({
  name: 'widgetjs.cn.utilities.convert',
  title: { 'zh-CN': '图片格式转换', 'en-US': 'Image Converter' },
  description: { 'zh-CN': '支持 HEIC, JPG, PNG, WEBP, BMP, ICO 格式转换', 'en-US': 'Convert HEIC/Images to JPG, PNG, WEBP, BMP, ICO.' },
  keywords: [WidgetKeyword.RECOMMEND],
  categories: ['utilities'],
  lang: 'zh-CN',
  width: 4,
  height: 5,
  minWidth: 3,
  maxWidth: 6,
  minHeight: 4,
  maxHeight: 6,
  browserWindowOptions: {
    backgroundThrottling: false,
    skipTaskbar: false,
    titleBarStyle: 'default',
    transparent: false,
    resizable: true,
    frame: true,
    minimizable: true,
    maximizable: true,
    width: 800,
    center: true,
    height: 600,
    movable: true,
    preventDefaultClose: false,
  },
  socialLinks: [
    { name: 'github', link: 'https://github.com/rtugeek/utilities' },
  ],
  supportDeployMode: DeployMode.BACKGROUND,
  previewImage: '/images/preview_convert.png',
  path: '/widget/convert',
  configPagePath: undefined,
})

export default ConvertWidget
