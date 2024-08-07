<script lang="ts" setup>
import { WidgetConfigOption, useWidget } from '@widget-js/vue3'
import { Switch } from '@icon-park/vue-next'
import { ref } from 'vue'
import CurrencySelect from '@/widgets/forex/CurrencySelect.vue'

const { widgetParams } = useWidget()
const widgetConfigOption = new WidgetConfigOption({
  custom: true,
  theme: {
    backgroundColor: true,
    borderRadius: false,
    color: true,
    primaryColor: true,
  },
})

const currencyCode1 = ref('USD')
const currencyCode2 = ref('CNY')
</script>

<template>
  <WidgetEditDialog :option="widgetConfigOption" :widget-params="widgetParams">
    <el-form-item>
      <div class="flex gap-2">
        <el-input /><CurrencySelect v-model="currencyCode1" />
      </div>
    </el-form-item>
    <el-button class="mb-4">
      <template #icon>
        <Switch />
      </template>
    </el-button>
    <el-form-item>
      <div class="flex gap-2">
        <el-input /><CurrencySelect v-model="currencyCode2" />
      </div>
    </el-form-item>
  </WidgetEditDialog>
</template>

<style scoped></style>
