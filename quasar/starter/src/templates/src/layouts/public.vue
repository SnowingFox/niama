<template lang="pug">
q-layout.@l-Public(view="hHh Lpr lff") 
  q-header: q-toolbar.pr-0.bg-secondary
    q-toolbar-title Niama starter
    q-btn.sm_hidden(icon="menu", unelevated, stretch, color="grey1", @click="show = !show")
    q-tabs.-menu.bg-grey1(inline-label, stretch, indicator-color="primary") 
      q-route-tab(v-for="nav of navs", :key="nav.id", v-bind="nav", :label="$t(`menus.${nav.id}`)")
  
  q-drawer(v-model="show", overlay, elevated): q-list(v-for="nav in navs", :key="nav.id")
    q-item(:exact="nav.exact", :to="nav.to"): q-item-section.uppercase {{ $t(`menus.${nav.id}`) }}
  
  q-page-container
    .fixed.inset-0.flex.items-center.justify-center: img.max-w-xs.opacity-50(alt="Logo", src="statics/logo.png")
    router-view
</template>

<script lang="ts">
import { useReadNavs } from '@niama/nav';
import { defineComponent, ref } from '@vue/composition-api';

import * as T from '@/<%= pkg.name %>/types';

// COMPONENT ===============================================================================================================================

export default defineComponent({
  meta() {
    return {
      title: this.$t(`titles.${this.$route.name}`),
      titleTemplate: (title) => `${title} - Niama Starter`,
    };
  },
  setup() {
    const show = ref(false);
    const { items: navs } = useReadNavs<Nav>({
      fields: ['exact', 'icon', 'id', 'to'],
      where: { parent: 'public' },
      update: (nav) => ({ ...nav, icon: nav.icon || undefined }),
    });
    return { navs, show };
  },
});

// TYPES ===================================================================================================================================

interface Nav extends Pick<T.Nav.Po, 'exact' | 'id' | 'to'> {
  icon?: string;
}
</script>

<style lang="postcss" scoped>
.l-Public {
  &_menu { @apply hidden } }

@screen sm { .l-Public { 
  &_menu { @apply flex } } }
</style>