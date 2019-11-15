<template lang="pug">
validation-provider(v-slot="{ errors, invalid, validated }", mode="eager", :rules="rules", slim)
  q-autocomplete(v-bind="$attrs", v-on="$listeners", v-model="innerValue", :error="validated && invalid", :error-message="errors[0]", 
  no-error-icon) 
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api';
import { ValidationProvider } from 'vee-validate';

import QAutocomplete from './component.autocomplete.quasar.vue';
import * as T from './types';

// COMPONENT ===============================================================================================================================

export default createComponent({
  components: { QAutocomplete, ValidationProvider },
  props: {
    rules: { type: String },
    value: { type: Object, default: () => null },
  },
  setup(p: Props, { emit }: T.SetupContext) {
    const innerValue: T.Ref<T.Vo> = ref(p.value);

    watch(innerValue, (v) => emit('input', v));
    watch(() => p.value, (v) => (innerValue.value = v));

    return { innerValue };
  },
});

// TYPES ===================================================================================================================================

export interface Props {
  rules: string;
  value: T.Vo;
}
</script>
