<template lang="pug">
validation-provider(v-slot="{ errors, invalid, validated }", mode="eager", :rules="rules", slim)
  address-simple-select(v-bind="$attrs", v-on="$listeners", v-model="innerValue", :error="validated && invalid", :error-message="errors[0]", 
  no-error-icon)
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import { ValidationProvider } from 'vee-validate';

import AddressSimpleSelect from './cmp.simple.select.vue';
import * as T from './types';

// COMPONENT ===============================================================================================================================

export default defineComponent({
  components: { AddressSimpleSelect, ValidationProvider },
  props: {
    rules: { type: String },
    value: { type: Object, default: () => null },
  },
  setup(p: Props, { emit }: T.SetupContext): Setup {
    const innerValue: T.Ref<T.Proposal> = ref(p.value);
    const getValue = () => p.value;
    watch(innerValue, (v) => emit('input', v));
    watch(getValue, (v) => (innerValue.value = v));
    return { innerValue };
  },
});

// TYPES ===================================================================================================================================

export type Props = { rules: string; value: T.Proposal };
export type Setup = { innerValue: T.Ref<T.Proposal> };
</script>
