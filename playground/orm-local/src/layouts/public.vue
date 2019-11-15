<template lang="pug">     
  nav-data(v-slot="{ items: navs}", :args="{ where: { parent: 'public' }}", :modelToItem="i18nNav"): q-layout(view="hHh Lpr lff") 
    q-header: q-toolbar.bg-secondary.q-pr-none
      q-toolbar-title Niama starter
      q-btn.xs(icon="menu", color="primary", unelevated, stretch, @click="drawer = !drawer")
      q-tabs.gt-xs.bg-accent(inline-label, stretch): q-route-tab(v-for="nav of navs", :key="nav.key", v-bind="nav")
    
    q-drawer(v-model="drawer", overlay, elevated): q-list(v-for="nav in navs", :key="nav.key")
      q-item(:exact="nav.exact", :to="nav.to"): q-item-section.text-uppercase {{ nav.label }}
    
    q-page-container
      img.fixed-center.Logo(alt="Logo", src="statics/logo.png")
      router-view
</template>

<script lang="ts">
import { pick } from '@niama/core';
import { Nav } from '@niama/nav';
import { NavRP as NavData } from '@niama/nav-client';
import Vue from 'vue';
import Component from 'vue-class-component';
import { LocaleMessage } from 'vue-i18n';

@Component({
  components: { NavData },
  meta() {
    return { title: this.$t(`titles.${this.$route.name}`), titleTemplate: (title) => `${title} - Niama Starter` };
  },
})
export default class PublicL extends Vue {
  // VARIABLES =============================================================================================================================

  drawer: boolean = false;

  // METHODS ===============================================================================================================================

  i18nNav(nav: Nav): { exact: boolean; icon?: string; key: string; label: LocaleMessage; to: string } {
    return { ...pick(nav, ['exact', 'to']), icon: nav.icon || undefined, key: nav.id, label: this.$t(`menus.${nav.id}`) };
  }
}
</script>

<style lang="stylus" scoped>
.Logo
  max-width 300px
  opacity 0.6
</style>