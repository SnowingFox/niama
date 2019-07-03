<template lang="pug">     
  d-posts(v-slot="{ actions: { create }, loading }"): q-layout(view="hHh Lpr lFf")
    q-header
      q-toolbar.bg-accent
        q-toolbar-title NIAMA REST
        q-btn(color="white", flat, @click="create") {{ $t('btnAddPost') }}
        q-btn(color="white", to="/connexion", flat) {{ $t('btnSignin') }}  
      q-toolbar.bg-secondary
        d-navs(v-slot="{items: navs}", :args="{ where: { parent: 'public' }}")
          q-tabs(inline-label): q-route-tab(v-for="nav of navs", :key="nav.id", v-bind="routeTab(nav)")
        q-space
        q-breadcrumbs: q-breadcrumbs-el(v-for="breadcrumb, i of $route.meta.breadcrumbs", :key="i", v-bind="breadcrumb")
    q-drawer(value, side="left", :width="200")
    q-page-container: router-view
    q-drawer(value, side="right", :width="300")
    q-inner-loading(:showing="loading"): q-spinner(color="primary", size="80px")
</template>

<script lang="ts">
import { Nav } from '@niama/nav';
import { NavRP as DNavs } from '@niama/nav/front';
import Vue from 'vue';
import Component from 'vue-class-component';

import { PostRP as DPosts } from '@/modules/post/post.component.repository';

@Component({ components: { DNavs, DPosts } })
export default class PublicL extends Vue {
  // METHODS ===============================================================================================================================
  
  routeTab(nav: Nav) {
    return { ...nav, icon: nav.icon || undefined, label: this.$t(`menus.${nav.id}`) };
  }
}
</script>

<i18n>
fr: 
  btnAddPost: "Ajouter un article"
  btnSignin: "Connexion"
</i18n>