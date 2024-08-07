<script setup lang="ts">
import { Down } from '@icon-park/vue-next'
import { CNY, type CurrencyInfo } from '@/api/FinanceApi'

const emits = defineEmits(['titleClick', 'valueChange'])

const currency = defineModel<CurrencyInfo>({
  default: CNY,
})

const value = defineModel<number>('value', {
  default: 1,
})
</script>

<template>
  <div class="currency">
    <div class="title" @click="emits('titleClick')">
      <img :src="currency.flag">{{ currency.name }}/{{ currency.code }}
      <Down class="ml-auto" />
    </div>
    <div class="value">
      <div class="symbol">
        {{ currency.symbol }}
      </div><input v-model="value" type="number" @change="emits('valueChange')">
    </div>
  </div>
</template>

<style scoped lang="scss">
.currency {
  border-radius: 8px;
  display: flex;
  overflow: hidden;
  width: 100%;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.1);
  .title{
    padding: 6px;
    display: flex;
    gap: 8px;
    font-size: 14px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.2);
    &:hover{
      background-color: rgba(255, 255, 255, 0.3);
    }
    img{
      width: 20px;
    }
  }

  .value{
    display: flex;
    align-items: center;
    padding: 6px;
    gap:4px;
    flex:1;
    .symbol, input{
      font-size: 24px;
      line-height: 1;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input {
      border: none;
      background-color: transparent;
      color: white;
      padding: 0;
      width: 60vw;
      &:focus{
        border: none;
        outline: none;
      }
      &:hover {
        border: none;
      }
    }
  }

}
</style>
