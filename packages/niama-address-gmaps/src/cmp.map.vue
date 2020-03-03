<template lang="pug">
- c = 'n-address-Map'; e = (cl) => `${c}_${cl}`
div(:class="{ 'is-readonly': readonly }", class=c)
  q-skeleton(v-if="initializing", size="100%")
  div(v-show="!initializing", ref="elContainer", class=e('container'))
</template>

<script lang="ts">
import { onMountedAndInitialized } from '@niama/address';
import { fill, isFunction } from '@niama/core';
import { computed, defineComponent, ref, watch } from '@vue/composition-api';

import * as T from './types';
import MarkerClusterer from '@google/markerclustererplus';

// COMPONENT ===============================================================================================================================

export default defineComponent({
  props: {
    close: { type: Boolean, default: false },
    clustered: { type: Boolean, default: false },
    clusters: {
      type: Array,
      default: () => [
        { className: 'n-address-Map_cluster', height: 40, width: 40 },
        { className: 'n-address-Map_cluster', height: 60, width: 60 },
        { className: 'n-address-Map_cluster', height: 80, width: 80 },
        { className: 'n-address-Map_cluster', height: 100, width: 100 },
        { className: 'n-address-Map_cluster', height: 120, width: 120 },
      ],
    },
    items: { type: Array, default: () => [] },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
    open: { type: String, default: 'click' },
    readonly: { type: Boolean, default: false },
    zoom: { type: Number, default: 12 },
  },
  setup(p: Props) {
    const { elContainer, initializing, map, markers } = useInit({ p });
    return { elContainer, initializing, map, markers };
  },
});

// USES ====================================================================================================================================

const useInit = ({ p }: UseInitP) => {
  const map: T.Ref<T.Maybe<T.Map>> = ref(null);
  const markers: T.Ref<T.Marker[]> = ref([]);

  let info: T.InfoWindow;
  let clusterer: MarkerClusterer;

  const initializing = ref(true);
  const elContainer = ref(undefined);

  const mapO = computed(() => ({
    disableDefaultUI: p.readonly,
    gestureHandling: p.readonly ? 'none' : 'auto',
    zoom: p.readonly ? 13 : p.zoom,
    // zoomControl: true,
  }));

  onMountedAndInitialized(({ InfoWindow, Map, Marker }) => {
    info = new InfoWindow();
    map.value = new Map(elContainer.value!, {
      center: { lat: p.lat ?? 0, lng: p.lng ?? 0 },
      ...fill(false, 'clickableIcons', 'fullscreenControl', 'mapTypeControl', 'streetViewControl'),
      zoom: p.zoom,
      ...mapO.value,
    });

    const getItems = () => p.items;
    const getReadonly = () => p.readonly;

    watch(getItems, (items) => {
      markers.value.forEach((marker) => {
        marker.setMap(null);
        google.maps.event.clearInstanceListeners(marker);
      });

      markers.value = items.map(({ content, lat, lng, ...rest }) => {
        const icon = isFunction(rest.icon) ? rest.icon(p.readonly) : rest.icon;
        const draggable = rest.draggable && !p.readonly;
        const marker = new Marker({ icon, map: map.value!, animation: 2, draggable, position: { lat, lng } });
        marker['itemData'] = rest;

        if (content) {
          marker.addListener(p.open, () => {
            info.setContent(content);
            info.open(map.value!, marker);
          });
          if (p.close) marker.addListener('mouseout', () => info.close());
        }

        return marker;
      });

      if (p.clustered) clusterer = new MarkerClusterer(map.value! as any, markers.value as any, { styles: p.clusters });
    });

    watch(getReadonly, (readonly) => {
      map.value!.setOptions(mapO.value as any);
      markers.value.forEach((marker) => {
        const { draggable, icon } = marker['itemData'];
        marker.setIcon(isFunction(icon) ? icon(readonly) : icon);
        marker.setDraggable(draggable && !readonly);
      });
    });

    initializing.value = false;
  });

  return { elContainer, initializing, map, markers };
};

// TYPES ===================================================================================================================================

export type Props = T.Coords & {
  close: boolean;
  clustered: boolean;
  clusters: any[];
  items: T.MarkerItem[];
  open: 'click' | 'mouseover';
  readonly: boolean;
  zoom: number;
};

export type UseInitP = { p: Props };
</script>

<style lang="postcss" scoped>
.n-address-Map { @apply _relative;
  &_container { @apply _w-full _h-full _bg-grey-1 } }
</style>

<style lang="postcss">
.n-address-Map_cluster { @apply _bg-primary _rounded-full _text-white _flex _items-center _justify-center } 
</style>
