<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import { useMenuListener, useWidget } from '@widget-js/vue3'
import { MenuApi, type WidgetMenuItem } from '@widget-js/core'
import { useDebounceFn, useIntervalFn, useStorage } from '@vueuse/core'
import { Refresh } from '@icon-park/vue-next'
import consola from 'consola'
import { CNY, type CurrencyInfo, CurrencyMapping, FinanceApi, USD } from '@/api/FinanceApi'
import CurrencyBlock from '@/widgets/forex/CurrencyBlock.vue'

const { widgetParams } = useWidget()
const loading = ref(false)
const value1 = ref(1)
const value2 = ref(1)
const price = ref(1.0)
const upDown = ref<{
  text: string
  value: string
}[]>([])
const currency1 = useStorage<CurrencyInfo>(`currency1-${widgetParams.id}`, USD)
const currency2 = useStorage<CurrencyInfo>(`currency2-${widgetParams.id}`, CNY)

const currentIndex = ref(0)
function selectCurrency(index: number) {
  currentIndex.value = index
  const menus = CurrencyMapping.map((it) => {
    const menu: WidgetMenuItem = {
      id: it.code!,
      label: `${it.name}/${it.code}`,
    }
    return menu
  })
  MenuApi.showMenu({
    menuItems: menus,
  })
}

useMenuListener((type, menu) => {
  const currencyFind = CurrencyMapping.find(it => it.code == menu.id)
  if (currencyFind) {
    if (currentIndex.value == 0) {
      currency1.value = currencyFind
      refresh()
    }
    else {
      currency2.value = currencyFind
      refresh()
    }
  }
})

function refresh() {
  loading.value = true
  FinanceApi.getForexRates(currency1.value.code, currency2.value.code).then((res) => {
    consola.info('getForexRates', res)
    if (res.ResultCode == '0') {
      const forexRate = res.Result.revCode[0]
      price.value = Number.parseFloat(forexRate.price)
      value2.value = value1.value * price.value
      upDown.value = forexRate.list
    }
  }).finally(() => {
    loading.value = false
  })
}

onMounted(async () => {
  await nextTick()
  refresh()
})

const onChanged = useDebounceFn((currency: CurrencyInfo, value: number) => {
  if (currency.code == currency1.value.code) {
    value2.value = value * price.value
  }
  else {
    value1.value = Math.round(value / price.value * 10000) / 10000
  }
}, 500)

useIntervalFn(refresh, 1000 * 60)
</script>

<template>
  <widget-wrapper>
    <div class="root flex flex-col gap-2 p-4">
      <div class="font-bold flex">
        {{ currency1.name }}兑{{ currency2.name }}
        <Refresh class="ml-auto cursor-pointer" :class="{ rotating: loading }" @click="refresh" />
      </div>
      <div class="flex text-xs gap-2">
        <div v-for="item in upDown" class="flex diff" :class="{ up: item.value.includes('+'), down: item.value.includes('-') }">
          <div class="value">
            {{ item.value }}
          </div>
        </div>
      </div>
      <CurrencyBlock v-model:value="value1" v-model="currency1" class="flex-1" @value-change="onChanged(currency1, value1)" @title-click="selectCurrency(0)" />
      <CurrencyBlock v-model:value="value2" v-model="currency2" class="flex-1" @value-change="onChanged(currency2, value2)" @title-click="selectCurrency(1)" />
    </div>
  </widget-wrapper>
</template>

<style scoped lang="scss">
*{
  user-select: none;
}

.root{
  color: var(--widget-color);
  box-sizing: border-box;
  position: relative;
}

.diff{
  &.up{
    color: #f33;
  }

  &.down{
    color: #96ff33;
  }
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.rotating{
  animation: rotating 2s linear infinite;
}
</style>
