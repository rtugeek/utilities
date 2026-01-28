import { createI18n } from 'vue-i18n'
import defaultEn from '@/i18n/en.json'
import defaultZh from '@/i18n/zh.json'

export const i18n = createI18n({
  locale: 'zh',
  messages: {
    zh: defaultZh,
    en: defaultEn,
  },
  fallbackLocale: 'en',
})
