<template lang="pug">
  post-item(v-slot="{ item, loading }", :id="$route.params.id"): q-page.Page(padding)
    
    q-toolbar.Toolbar.text-white(:class="{ 'bg-primary': item || loading, 'bg-negative': !(item || loading)}")
      q-toolbar-title {{ loading ? $t('titleLoading') : item ? item.label : $t('titleUnknown') }}
      q-btn(v-if="item", icon="category", flat, round, dense, @click="toggleSameCategory")
        q-tooltip(content-class="bg-info", transition-show="scale", transition-hide="scale") {{ $t('btnCategory') }}
      q-btn(:to="{ name: 'posts' }", icon="list", flat, round, dense) 
        q-tooltip(:content-class="{ 'bg-info': item || loading, 'bg-negative': !(item || loading) }", transition-show="scale", transition-hide="scale") {{ $t('btnBack') }}
    q-linear-progress.q-mb-md(query, color="info", :class="{ 'invisible' : !loading }")
    
    .row.q-col-gutter-md
      .col-6.column
        .text-caption.text-accent.q-mb-xs(:class="getCategoryClasses(item, loading)") {{ item ? item.category : 'category' }}
        .col-grow.text-body1.text-justify(:class="getCategoryClasses(item, loading)") {{ item ? item.content : 'content' }}
      .col-6: q-img.bg-grey-4(:src="item ? item.image : null", :ratio="3/2")
      
    q-dialog(v-if="item", v-model="showSameCategory", position="right")
      post-items(v-slot="{ count, items, total }", :where="{ category: item.category }"): q-card.Dialog
        q-toolbar.bg-info.text-white: q-toolbar-title 
          | {{ $t('dialogTitle') }}
          q-badge(align="middle") {{ count }} / {{ total }} 
        q-list(separator)
          q-item(v-for="{ category, id, label } of items", :key="id", :to="{ name: 'post', params: { id } }"): q-item-section 
            q-item-label {{ label }}
            q-item-label(caption) {{ category }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { PostItem } from '@/modules/post/f.post.component.item';
import { PostItems } from '@/modules/post/f.post.component.items';

@Component({ components: { PostItem, PostItems } })
export default class PostP extends Vue {
  showSameCategory: boolean = false;

  getCategoryClasses(item, loading): string[] {
    return loading || !item ? ['bg-grey-4', 'text-grey-4'] : [];
  }

  toggleSameCategory() {
    this.showSameCategory = !this.showSameCategory;
  }
}
</script>

<i18n>
  fr:
    btnBack: "Retour à la liste des articles"
    btnCategory: "Voir les articles similaires"
    dialogTitle: "Dans la même catégorie"
    titleLoading: "Chargement de l'article..."
    titleUnknown: "Désolé, cet article n'existe pas."
</i18n>

<style lang="stylus" scoped>
.Dialog
  min-width 300px

.Toolbar
  transition 0.5s background linear
</style>
