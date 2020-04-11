<template lang="pug">
- c = 'n-address-Select'; e = (cl, mod) => [`${c}_${cl}`, ...mod ? [`${c}_${cl}--${mod}`]: []]
q-select(v-bind="$attrs", v-on="$listeners", :value="innerValue", :options="options", fill-input, hide-selected, use-input, clearable, 
:clear-icon="fasTimes", hide-dropdown-icon, @filter="filter$.next(arguments)", @input="$emit('input', $event)",
:class="{ 'is-collapsed': collapsible && !expanded }", class=c)
  template(#prepend="", v-if="collapsible"): q-btn( :icon="fasSearch", @click="expanded = !expanded", flat, dense)
</template>

<script lang="ts">
import { fasSearch, fasTimes } from '@quasar/extras/fontawesome-v5';
import { computed, defineComponent, ref } from '@vue/composition-api';

import * as T from './types';
import { pick, useSourcable } from '@niama/core';
import { useHintsFromInput } from './uses';

// COMPONENT ===============================================================================================================================

export default defineComponent({
  props: {
    collapsible: { type: Boolean, default: false },
    countries: { type: Array },
    expanded: { type: Boolean, default: false },
    toggle: { type: Boolean, default: false },
    type: { type: String, default: 'address' },
    value: { type: Object, default: () => null },
  },
  setup(p: Props) {
    const hintsFromInput = useHintsFromInput({ ...pick(p, ['countries', 'type']) });

    const { src$: filter$ } = useSourcable<void, [string, Function, Function], T.Maybe<T.Hint[]>>({
      switcher: ([input]) => hintsFromInput(input),
      selector: ([_, update], hints) => update(() => (options.value = hints || [])),
    });

    const options: T.Ref<T.Hint[]> = ref([]);
    const innerValue: T.Ref<string> = computed(() => (p.value && p.value.label) || '');

    return { fasSearch, fasTimes, filter$, innerValue, options };
  },
});

// TYPES ===================================================================================================================================

export type Props = {
  collapsible?: boolean;
  countries?: string[];
  expanded?: boolean;
  toggle?: boolean;
  type: T.HintType;
  value: T.Hint;
};
</script>

<style scoped>
.n-address-Select {
  margin-bottom: 0.5rem;
  overflow: hidden;
  width: 100%;
  max-width: 36rem;
  transition: width 0.3s ease-in-out;
}
.is-collapsed.n-address-Select {
  width: 3.5rem;
}
</style>
