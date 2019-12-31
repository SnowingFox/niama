<template lang="pug">
.q-suggest-map(:class="{ 'is-readonly': readonly, 'tw-relative': true }")
  .q-suggest-map__container(ref="mapRef", class="tw-w-full tw-h-full")
  //-div(v-if="!readonly")
    address-select.q-suggest-map__search(outlined, bg-color="white", v-model="value", collapsible, class="tw-absolute tw-top-0 tw-left-0 tw-mt-2 tw-ml-2")
    q-btn.q-suggest-map__submit(icon="fa fa-check", size="lg", @click="submit$.next()", :loading="loading", round, class="tw-absolute tw-top-0 tw-right-0 tw-mt-2 tw-mr-2 tw-bg-white tw-text-green")
  //-q-inner-loading(:showing="initializing")
</template>

<script lang="ts">
import { computed, createComponent, ref, watch } from '@vue/composition-api';

import AddressSelect from '../../src/component.select.quasar-vee.vue';
// import { useMap } from './use-map';
import * as T from './types';
// import { useGeocoder } from './use-geocoder';
import { useSourcable, fill } from '@niama/core';

import { map as map$, switchMap, tap } from 'rxjs/operators';
// import { fromResult } from './helper';

// COMPONENT ===============================================================================================================================

export default createComponent({
  components: { AddressSelect },
  props: {
    lat: { type: Number },
    lng: { type: Number },
    readonly: { type: Boolean, default: false },
    value: { type: Object, default: () => null },
    zoom: { type: Number, default: 12 },
  },
  setup(p: Props, { emit }: T.SetupContext) {
    /*const { initializing, map, mapRef, marker } = useInit({ p });

    const { loading, src$: submit$ } = useUpdateValue({ emit, map, marker, p });
    return { initializing, loading, mapRef, submit$ };*/
  },
});

// USES ====================================================================================================================================

/*const useInit = ({ p }) => {
  const { service$ } = useMap();

  const map: T.Ref<T.Maybe<T.Map>> = ref(null);
  const marker: T.Ref<T.Maybe<T.Marker>> = ref(null);
  const initializing = ref(true);
  const mapRef = ref(undefined);

  const mapO = computed(() => ({ disableDefaultUI: p.readonly, gestureHandling: p.readonly ? 'none' : 'auto', zoom: p.readonly ? 13 : p.zoom }));
  const isMarkerDraggable = computed(() => !p.readonly);
  const markerIcon = computed(() =>
    p.readonly
      ? {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 30,
          fillColor: '#adce5b',
          fillOpacity: 0.5,
          strokeWeight: 0,
        }
      : null
  );

  service$.subscribe(({ Map, Marker }) => {
    const center = { lat: (p.value && p.value.lat) || p.lat || 0, lng: (p.value && p.value.lng) || p.lng || 0 };

    map.value = new Map(mapRef.value!, {
      center,
      ...fill(false, 'clickableIcons', 'fullscreenControl', 'mapTypeControl', 'streetViewControl'),
      zoom: p.zoom,
      ...(mapO.value as any),
    });

    marker.value = new Marker({
      map: map.value,
      icon: markerIcon.value || undefined,
      animation: google.maps.Animation.DROP,
      position: center,
      draggable: isMarkerDraggable.value,
    });

    initializing.value = false;
  });

  watch(
    () => p.readonly,
    () => {
      if (map.value) map.value.setOptions(mapO.value as any);
      if (marker.value) {
        marker.value.setDraggable(isMarkerDraggable.value);
        marker.value.setIcon(markerIcon.value);
      }
    }
  );

  return { initializing, map, mapRef, marker };
};

const useUpdateValue = ({ emit, map, marker, p }) => {
  const { geocode$ } = useGeocoder();

  return useSourcable(() =>
    geocode$.pipe(
      switchMap((geocode) => geocode({ location: marker.value.getPosition() })),
      map$((results) => (results.length ? fromResult(results[0] as any) : null)),
      tap((address: T.Maybe<T.Vo>) =>
        map.value!.setCenter({ lat: (address && address.lat) || p.lat || 0, lng: (address && address.lng) || p.lng || 0 })
      ),
      tap((address) => emit('input', address))
    )
  );
};*/

// TYPES ===================================================================================================================================

export interface Props {
  lat: number;
  lng: number;
  readonly: boolean;
  value: T.Dto;
  zoom: number;
}
</script>
