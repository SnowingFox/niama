<template lang="pug">
.q-map(:class="{ 'is-readonly': readonly, 'tw-relative': true }")
  .q-map__map(ref="mapRef", class="tw-w-full tw-h-full")
  //-q-inner-loading(:showing="initializing")
</template>

<script lang="ts">
import { computed, createComponent, ref, watch } from '@vue/composition-api';

// import { useMap } from './use-map';
import * as T from './types';

import { fill } from '@niama/core';

// COMPONENT ===============================================================================================================================

export default createComponent({
  props: {
    info: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    readonly: { type: Boolean, default: false },
    zoom: { type: Number, default: 12 },
  },
  setup(p: Props) {
    /*const { initializing, mapRef } = useInit({ p });

    return { initializing, mapRef };*/
  },
});

// USES ====================================================================================================================================

/*const useInit = ({ p }) => {
  const { service$ } = useMap();

  const map: T.Ref<T.Maybe<T.Map>> = ref(null);
  const marker: T.Ref<T.Maybe<T.Marker>> = ref(null);
  const info: T.Ref<T.Maybe<T.InfoWindow>> = ref(null);
  const initializing = ref(true);
  const mapRef = ref(undefined);

  const mapO = computed(() => ({
    disableDefaultUI: p.readonly,
    gestureHandling: p.readonly ? 'none' : 'auto',
    zoomControl: true,
  }));

  service$.subscribe(({ InfoWindow, Map, Marker }) => {
    const center = { lat: p.lat || 0, lng: p.lng || 0 };

    map.value = new Map(mapRef.value!, {
      center,
      ...fill(false, 'clickableIcons', 'fullscreenControl', 'mapTypeControl', 'streetViewControl'),
      zoom: p.zoom,
      ...(mapO.value as any),
    });

    marker.value = new Marker({ map: map.value, animation: google.maps.Animation.DROP, position: center });
    
    if (p.info) {
      info.value = new InfoWindow({ content: p.info, maxWidth: '16rem' });
      marker.value.addListener('mouseover', () => info.value!.open(map.value!, marker.value!));
      marker.value.addListener('mouseout', () => info.value!.close());
    }

    initializing.value = false;
  });

  watch(
    () => p.readonly,
    () => {
      if (map.value) map.value.setOptions(mapO.value as any);
    }
  );

  return { initializing, mapRef };
};*/

// TYPES ===================================================================================================================================

export interface Props {
  info?: string;
  lat: number;
  lng: number;
  readonly: boolean;
  zoom: number;
}
</script>
