<script setup lang="ts">
import { watch } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { useCurrencyInput, CurrencyInputOptions } from 'vue-currency-input'

// General State
const props = defineProps({
  modelValue: Number,
  label: String,
  options: Object
})
const emit = defineEmits(['update:modelValue'])

const baseOptions = {
  currency: 'EUR',
  currencyDisplay: 'symbol',
  valueRange: {
    min: 0
  },
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: false,
  autoDecimalDigits: true,
  useGrouping: true,
  accountingSign: false
}

const { inputRef, numberValue, formattedValue, setValue, setOptions } = useCurrencyInput(baseOptions as CurrencyInputOptions, false)

// Change Model
watch(
  () => props.modelValue,
  value => {
    setValue(value as number)
  }
)

// Change Currency
watch(
  () => props.options,
  options => {
    setOptions({ ...baseOptions, ...options } as CurrencyInputOptions)
  }
)

// Debounced Model
watchDebounced(numberValue as any, (value: number) => emit('update:modelValue', value), { debounce: 600 })
</script>

<template>
  <v-text-field :label="props.label" v-model="formattedValue" variant="underlined" ref="inputRef" />
</template>
