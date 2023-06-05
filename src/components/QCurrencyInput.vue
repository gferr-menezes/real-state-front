<template>
  <q-input outlined class="full-width" ref="inputRef" hint="" dense v-model.lazy="formattedValue" />
</template>

<script setup lang="ts">

import { useCurrencyInput } from "vue-currency-input";
import { watch } from "vue";

const props = defineProps<{
  modelValue?: number;
}>();

const configMoneyOptions = {
  currency: 'BRL',
  locale: 'pt-BR',
  autoDecimalMode: true,
  distractionFree: false,
  precision: 2,
  valueRange: { min: 0, max: 9999999 },
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: false,
  autoDecimalDigits: true,
  useGrouping: true,
  accountingSign: false
}

const {
  inputRef,
  formattedValue,
  setValue,
} = useCurrencyInput(configMoneyOptions);

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      setValue(value);
    }

  }
);

</script>
