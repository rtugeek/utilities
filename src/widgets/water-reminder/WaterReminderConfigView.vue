<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { WidgetTheme } from '@widget-js/core'
import {
  useWidget,
  WidgetConfigOption,
  WidgetEditDialog,
} from '@widget-js/vue3'
import { useI18n } from 'vue-i18n'
import {
  DEFAULT_WATER_REMINDER_CONFIG,
  type IWaterReminderConfig,
} from '@/widgets/water-reminder/model/WaterReminderConfig'

const { t } = useI18n()

const configData = useStorage<IWaterReminderConfig>('water-reminder-config', DEFAULT_WATER_REMINDER_CONFIG)
const defaultTheme = new WidgetTheme({
  useGlobalTheme: false,
  backgroundColor: '#fff',
  color: '#092239',
  primaryColor: '#2596FF',
})
const {
  widgetParams,
  save,
} = useWidget({
  defaultTheme,
})

const widgetConfigOption = new WidgetConfigOption({
  custom: true,
  theme: {
    backgroundColor: true,
    borderRadius: false,
    color: true,
    primaryColor: true,
  },
})
</script>

<template>
  <WidgetEditDialog
    :widget-params="widgetParams"
    :option="widgetConfigOption"
    label-width="150px"
    @apply="save"
    @confirm="save({ closeWindow: true })"
  >
    <template #custom>
      <el-form>
        <el-form-item :label="t('waterReminder.config.enableReminder')">
          <el-checkbox v-model="configData.enableReminder" />
        </el-form-item>
        <el-tooltip
          v-if="configData.enableReminder"
          class="box-item"
          effect="dark"
          :content="t('waterReminder.config.intervalTooltip')"
          placement="top-start"
        >
          <el-form-item :label="t('waterReminder.config.intervalLabel')">
            <el-input-number v-model="configData.interval" :min="5" :max="100" />
          </el-form-item>
        </el-tooltip>
        <el-form-item :label="t('waterReminder.config.targetCup')">
          <el-input-number v-model="configData.targetCup" :min="1" :max="20" />
        </el-form-item>
      </el-form>
    </template>
  </WidgetEditDialog>
</template>

<style scoped lang="scss"></style>
