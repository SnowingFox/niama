<template lang="pug">
q-select(v-bind="$attrs", v-on="$listeners", :value="innerValue", :options="options", fill-input, hide-selected, use-input, clearable, 
clear-icon="fas fa-times", hide-dropdown-icon, @filter="filter$.next(arguments)", @input="$emit('input', $event)",
:class="{ 'is-collapsed': collapsible && !expanded }")
  template(#prepend="", v-if="collapsible"): q-btn( icon="fa fa-search", @click="expanded = !expanded", flat, dense)
</template>

<script lang="ts">
import { computed, createComponent, ref } from '@vue/composition-api';

import * as T from './types';
import { useAddress } from './provider';
import { useSourcable, pick } from '@niama/core';

// COMPONENT ===============================================================================================================================

export default createComponent({
  props: {
    collapsible: { type: Boolean, default: false },
    countries: { type: Array },
    expanded: { type: Boolean, default: false },
    toggle: { type: Boolean, default: false },
    type: { type: String, default: 'address' },
    value: { type: Object, default: () => null },
  },
  setup(p: Props) {
    const $niama = { address: useAddress() };

    const { src$: filter$ } = useSourcable<void, [string, Function, Function], T.Suggestion[]>({
      switcher: ([input]) => $niama.address.suggestionsFromInput$!({ $niama, input, ...pick(p, ['countries', 'type']) }),
      selector: ([_, update], suggestions) => update(() => (options.value = suggestions)),
    });

    const options: T.Ref<T.Suggestion[]> = ref([]);
    const innerValue: T.Ref<string> = computed(() => (p.value && p.value.label) || '');

    return { filter$, innerValue, options };
  },
});

// TYPES ===================================================================================================================================

export interface Props {
  collapsible?: boolean;
  countries?: string[];
  expanded?: boolean;
  toggle?: boolean;
  type: T.SuggestionType;
  value: T.Suggestion;
}
</script>

<style lang="postcss" scoped>
.q-select { @apply overflow-hidden w-full max-w-xl; transition: width .3s ease-in-out;
  &.is-collapsed { @apply w-14 } }
</style>
