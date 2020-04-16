<template lang="pug">
- c = 'n-address-MapSelect'; e = (cl) => `${c}_${cl}`
div(:class="{ 'is-readonly': readonly }", class=c)
  address-map(ref="elMap", v-bind="{ lat, lng, readonly, zoom }", :items="items", class=e('map'))
  div(v-if="!readonly")
    address-select(outlined, bg-color="white", v-model="value", collapsible, class=e('search'))
    q-btn(:icon="fasCheck", size="lg", @click="submit$.next(data)", :loading="loading", round, class=e('submit'))
</template>

<script lang="ts">
import { AddressSelect, useFromCoords } from '@niama/address';
import { useSourcable, pick } from '@niama/core';
import { defineComponent, ref, computed } from '@vue/composition-api';
import { fasCheck } from '@quasar/extras/fontawesome-v5';

import AddressMap from './cmp.map.vue';
import * as T from './typings';

// COMPONENT ===============================================================================================================================

export default defineComponent({
  components: { AddressMap, AddressSelect },
  props: {
    content: { type: String },
    draggable: { type: Boolean, default: false },
    icon: { type: [Object, Function] },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
    readonly: { type: Boolean, default: false },
    value: { type: Object, default: () => null },
    zoom: { type: Number, default: 12 },
  },
  setup(p: Props, { emit }: T.SetupContext) {
    const elMap: T.Ref<any> = ref(undefined);

    const data = computed(() => (elMap.value ? elMap.value.markers[0].getPosition() : { lat: p.lat, lng: p.lng }));
    const items = computed(() => [pick(p, ['content', 'draggable', 'icon', 'lat', 'lng'])]);

    const { loading, src$: submit$ } = useUpdateValue({ elMap, emit, p });
    return { data, elMap, fasCheck, items, loading, submit$ };
  },
});

// USES ====================================================================================================================================

const useUpdateValue = ({ elMap, emit, p }) => {
  const fromCoords = useFromCoords({
    notifyOnFail: true,
    onDone: (po) => {
      elMap.value.map.setCenter({ lat: po?.lat ?? p.lat ?? 0, lng: po?.lng ?? p.lng ?? 0 });
      emit('input', po);
    },
  });
  return useSourcable(fromCoords);
};

// TYPES ===================================================================================================================================

export type Props = T.MarkerItem & { readonly: boolean; value: T.Po; zoom: number };
</script>

<style lang="postcss" scoped>
.n-address-MapSelect { @apply relative;
  &_map { @apply w-full h-full }
  &_search { @apply absolute top-0 left-0 mt-2 ml-2 }
  &_submit { @apply absolute top-0 right-0 mt-2 mr-2 bg-white text-green } }
</style>