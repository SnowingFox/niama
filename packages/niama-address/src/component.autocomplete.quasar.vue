<template lang="pug">
q-select(v-bind="$attrs", v-on="$listeners", :value="innerValue", :options="options", emit-value, fill-input, hide-selected, use-input, 
clearable, clear-icon="fas fa-times", hide-dropdown-icon, @filter="filter$.next($event)", @input="$emit('input', $event)",
:class="{ 'is-collapsed': collapsible && !expanded }")
  template(#prepend="", v-if="collapsible"): q-btn( icon="fa fa-search", @click="expanded = !expanded", flat, dense)
</template>

<script lang="ts">
import { computed, createComponent, ref } from '@vue/composition-api';
import { switchMap, take } from 'rxjs/operators';

import { useSuggest } from './uses';
import * as T from './types';

// COMPONENT ===============================================================================================================================

export default createComponent({
  props: {
    collapsible: { type: Boolean, default: false },
    countries: { type: Array },
    expanded: { type: Boolean, default: false },
    fields: { type: Array },
    toggle: { type: Boolean, default: false },
    type: { type: String, default: 'address' },
    value: { type: Object, default: () => null },
  },
  setup(p: Props) {
    const { input, loading, result$, source$ } = useSuggest(p);

    const options: T.Ref<T.Option[]> = ref([]);
    const innerValue: T.Ref<string> = computed(() => (p.value && p.value.label) || '');

    

    
    
    const onFilter = (input, update) =>
      suggest$
        .pipe(
          switchMap((suggest) => suggest({ input })),
          take(1)
        )
        .subscribe((options) => update(() => (options.value = options)));

    return { innerValue, onFilter, options };
  },
});

// TYPES ===================================================================================================================================

export interface Props {
  collapsible?: boolean;
  countries?: string[];
  expanded?: boolean;
  fields?: string[];
  toggle?: boolean;
  type: T.PlacesType;
  value: T.Vo;
}
</script>

<style lang="postcss" scoped>
.q-select { @apply overflow-hidden w-full max-w-xl; transition: width .3s ease-in-out;
  &.is-collapsed { @apply w-14 } }
</style>
