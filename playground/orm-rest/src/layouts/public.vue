<template lang="pug">     
q-layout(view="hHh Lpr lff") 
  q-header: q-toolbar.bg-secondary.q-pr-none
    q-toolbar-title Niama starter
    q-btn.xs(icon="menu", color="primary", unelevated, stretch, @click="drawer = !drawer")
    q-tabs.gt-xs.bg-accent(inline-label, stretch): q-route-tab(v-for="nav in navs", :key="nav.key", v-bind="nav")
  
  q-drawer(v-model="drawer", overlay, elevated): q-list(v-for="nav in navs", :key="nav.key")
    q-item(:exact="nav.exact", :to="nav.to"): q-item-section.text-uppercase {{ nav.label }}
  
  q-page-container
    img.fixed-center.Logo(alt="Logo", src="statics/logo.png")
    router-view
</template>

<script lang="ts">
import { provideRouter, provideI18n, useI18n } from '@niama/core';
import { readMany, getModelToItem } from '@niama/nav-client';
import { defineComponent, ref } from '@vue/composition-api';
import { provideApi, useApi } from '@niama/api-client';

export default defineComponent({
  meta() {
    return { title: this.$t(`titles.${this.$route.name}`), titleTemplate: (title) => `${title} - Niama Starter` };
  },
  setup(_p, { root }: C.SetupContext) {
    provideNiama(root);

    const $niama = { api: useApi(), i18n: useI18n() };
    const drawer = ref(false);
    const { items: navs } = readMany({ $niama, modelToItem: getModelToItem({ $niama }), where: { parent: 'public' } });

    return { drawer, navs };
  },
});

export const provideNiama = ({ $apollo, $i18n, $router }) => {
  provideI18n($i18n);
  provideRouter($router);
  provideApi($apollo);
};
</script>

<style lang="stylus" scoped>
.Logo
  max-width 300px
  opacity 0.6
</style>

