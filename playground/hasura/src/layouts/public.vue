<template lang="pug">     
q-layout(view="hHh Lpr lff") 
  q-header: q-toolbar.Toolbar
    q-toolbar-title Niama starter
    q-btn.Menu-toggle(icon="menu", unelevated, stretch, @click="show = !show")
    q-tabs.Menu-items(inline-label, stretch): q-route-tab(v-for="nav of navs", :key="nav.id", v-bind="nav", :label="$t(`menus.${nav.id}`)")
  
  q-drawer(v-model="show", overlay, elevated): q-list(v-for="nav in navs", :key="nav.id")
    q-item(:exact="nav.exact", :to="nav.to"): q-item-section.Drawer-item {{ $t(`menus.${nav.id}`) }}
  
  q-page-container
    .Background: img.Background-image(alt="Logo", src="statics/logo.png")
    router-view
</template>

<script lang="ts">
import { useNavs } from '@niama/nav';
import { createComponent, ref } from '@vue/composition-api';

import * as T from '@/hasura/types';

// COMPONENT ===============================================================================================================================

export default createComponent({
  meta() {
    return {
      title: this.$t(`titles.${this.$route.name}`),
      titleTemplate: (title) => `${title} - Niama Starter`,
    };
  },
  setup() {
    const show = ref(false);
    const { items: navs } = useNavs<Nav>({
      fields: ['exact', 'icon', 'id', 'to'],
      where: { parent: 'public' },
      update: (nav) => ({ ...nav, icon: nav.icon || undefined }),
    });
    return { navs, show };
  },
});

// TYPES ===================================================================================================================================

interface Nav extends Pick<T.Nav.Dto, 'exact' | 'id' | 'to'> {
  icon?: string;
}
</script>

<style lang="postcss" scoped>
.Drawer-item { @apply tw-uppercase }
.Background { @apply tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center;
  &-image { @apply tw-max-w-xs tw-opacity-50 } }
.Menu {
  &-items { @apply tw-bg-accent tw-hidden }
  &-toggle { @apply tw-bg-primary } }
.Toolbar { @apply tw-pr-0 tw-bg-secondary }

@screen sm {
  .Menu {
    &-items { @apply tw-flex }
    &-toggle { @apply tw-hidden } }
}
</style>