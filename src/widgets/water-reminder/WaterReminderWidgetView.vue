<script lang="ts" setup>
import { useIntervalFn, useStorage } from '@vueuse/core'
import {
  type BroadcastEvent,
  type ReminderNotificationOption,
  SystemApiEvent,
  WidgetTheme,
} from '@widget-js/core'
import {
  LogApi,
  NotificationApi,
} from '@widget-js/core'
import {
  useAppBroadcast,
  useWidget,
  useWidgetSize,
  WidgetWrapper,
} from '@widget-js/vue3'
import consola from 'consola'
import dayjs from 'dayjs'
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'
import {
  DEFAULT_WATER_REMINDER_CONFIG,
  type IWaterReminderConfig,
} from '@/widgets/water-reminder/model/WaterReminderConfig'
import { WaterReminderHistory } from '@/widgets/water-reminder/model/WaterReminderHistory'
import WaterReminderWidget from '@/widgets/water-reminder/WaterReminder.widget'
import WaterReminderComponent from './WaterReminderComponent.vue'

const { t } = useI18n()

const cup = ref(0)
const configData = useStorage<IWaterReminderConfig>('water-reminder-config', DEFAULT_WATER_REMINDER_CONFIG)
const lastReminderAt = computed({
  get: () => {
    return dayjs(configData.value.lastReminderAt)
  },
  set: (value) => {
    configData.value.lastReminderAt = value.toISOString()
  },
})
const defaultTheme = new WidgetTheme({
  useGlobalTheme: false,
  backgroundColor: '#fff',
  color: '#092239',
  primaryColor: '#2596FF',
})
const { widgetTheme } = useWidget({
  defaultTheme,
})

watch(cup, (newValue) => {
  LogApi.log('cup changed!')
  WaterReminderHistory.setTodayCount(newValue)
})

const name = WaterReminderWidget.name
const cancelBroadcast = `${name}.cancel`
const okBroadcast = `${name}.ok`
useIntervalFn(() => {
  const now = dayjs()
  const second = now.diff(lastReminderAt.value, 'second')
  configData.value.lastReminderAt = lastReminderAt.value.toISOString()

  if (second >= configData.value.interval * 60 && cup.value < configData.value.targetCup) {
    consola.info('send reminder')
    lastReminderAt.value = dayjs()
    const options: ReminderNotificationOption = {
      title: t('waterReminder.notification.title'),
      message: t('waterReminder.notification.message'),
      icon: 'tea-drink',
      cancelButtonText: t('waterReminder.notification.cancel'),
      confirmButtonText: t('waterReminder.notification.confirm'),
      cancelBroadcast,
      confirmBroadcast: okBroadcast,
      duration: 5000,
    }
    NotificationApi.reminder(options)
  }
}, 10000)

useAppBroadcast([cancelBroadcast, okBroadcast, SystemApiEvent.DATE_CHANGED], async (broadcastEvent: BroadcastEvent) => {
  if (broadcastEvent.event == okBroadcast) {
    cup.value++
  }
  else if (broadcastEvent.event == SystemApiEvent.DATE_CHANGED) {
    cup.value = await WaterReminderHistory.getTodayCount()
  }
})

const { windowWidth } = useWidgetSize()
onMounted(async () => {
  const size = (windowWidth.value * 16) / 155
  document.documentElement.style.fontSize = `${size}px`
  await nextTick()
  cup.value = await WaterReminderHistory.getTodayCount()
})
</script>

<template>
  <WidgetWrapper>
    <WaterReminderComponent v-bind="widgetTheme" v-model:cup="cup" :target-cup="configData.targetCup" />
  </WidgetWrapper>
</template>

<style lang="scss"></style>
