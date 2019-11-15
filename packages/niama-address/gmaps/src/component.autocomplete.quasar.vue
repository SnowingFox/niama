<template lang="pug">
q-select(v-bind="$attrs", v-on="$listeners", :value="innerValue", :options="options", fill-input, hide-selected, use-input, clearable, 
clear-icon="fas fa-times", hide-dropdown-icon, @filter="onFilter", @input="$emit('input', $event)",
:class="{ 'tw-w-14': collapsible && !expanded, 'tw-overflow-hidden tw-max-w-xl': true, 'tw-w-full': !collapsible || expanded }", style="transition: width .3s ease-in-out")
  template(#prepend="", v-if="collapsible"): q-btn( icon="fa fa-search", @click="expanded = !expanded", flat, dense)
</template>

<script lang="ts">
import { computed, createComponent, ref } from '@vue/composition-api';
import { switchMap, take } from 'rxjs/operators';

import { usePlaces } from './use-places';
import * as T from './types';

// COMPONENT ===============================================================================================================================

export default createComponent({
  props: {
    collapsible: { type: Boolean, default: false},
    countries: { type: Array },
    expanded: { type: Boolean, default: false },
    fields: { type: Array },
    toggle: { type: Boolean, default: false },
    type: { type: String, default: 'address' },
    value: { type: Object, default: () => null },
  },
  setup(p: Props) {
    const { getFromInput$ } = usePlaces(p);

    const options: T.Ref<T.Suggestion[]> = ref([]);
    const innerValue: T.Ref<string> = computed(() => (p.value && p.value.label) || '');

    const onFilter = (input, update) =>
      getFromInput$
        .pipe(
          switchMap((getFromInput) => getFromInput({ input })),
          take(1)
        )
        .subscribe((suggestions) => update(() => (options.value = suggestions)));

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
  value: T.Suggestion;
}
</script>
