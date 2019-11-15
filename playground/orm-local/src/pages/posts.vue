<template lang="pug">
  post-items(v-slot="{ count, fetchMore, items, loading, total }", :first="first", :order-by="orderBy", :skip="skip", :where="where")
    q-page.Page(padding)
      q-toolbar.bg-primary.text-white
        q-toolbar-title {{ $t('title') }}
        q-select(v-model="selectedCategories", :options="categories", multiple, use-chips)
        q-chip
          q-avatar.bg-info.text-white {{ count }}
          | {{ $t('chipTotal', { total }) }}
        q-btn(icon="add", flat, dense, rounded, @click="showPostCreate = true")
      q-linear-progress.q-mb-md(query, color="info", :class="{ 'invisible' : !loading }")
      
      q-infinite-scroll(@load="fetchMore")
        .row.q-col-gutter-lg: .col-12.col-sm-6.col-md-4(v-for="item of items", :key="item.id")
          q-card
            q-img.cursor-pointer.bg-grey-4(:src="item.image", :ratio="3/2", @click="$router.push({ name: 'post', params: { id: item.id }})")
              template(#error=""): .absolute-full.flex.flex-center.bg-negative.text-white: q-icon(name="photo", size="4rem")
            post-actions(v-slot="{ deleteOne, update }"): q-card-section.row.items-center
              .col
                .text-h6.text-uppercase {{ item.label }}
                .text-caption.text-accent {{ $t(`postCategories.${item.category}`) }}
              q-btn(icon="edit", flat, dense, rounded, color="info")
              q-btn(icon="delete", flat, dense, rounded, color="negative", @click="onClickDelete(deleteOne, item.id)")
            q-card-section: .ellipsis-2-lines {{ item.content }}

        template(#loading=""): .row.justify-center.q-my-md: q-spinner-dots(color="primary", size="40px")

      q-dialog(v-model="showPostCreate", position="right"): q-card.Create: q-form(@submit="onSubmit")
        q-toolbar.bg-secondary.text-white: q-toolbar-title {{ $t('dialogTitle') }}
        q-card-section.q-gutter-md
          q-select(v-model="input.category", :label="$t('formCategory')", :options="categories", filled)
          q-input(v-model="input.label", :label="$t('formLabel')", filled)
          q-input(v-model="input.content", :label="$t('formContent')", type="textarea", filled)
        q-card-actions(align="right"): q-btn(type="submit", icon="add", color="primary", unelevated) {{ $t('formSubmit') }}


</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { PostActions } from '@/modules/post/f.post.component.actions';
import { PostItems } from '@/modules/post/f.post.component.items';
import { Maybe } from '@niama/core';
import { postCategories } from '../modules/post/post.helper';
import { PostCategory, PostCategorySelectO, PostCI } from '../modules/post/post.types';

@Component({ components: { PostActions, PostItems } })
export default class PostsP extends Vue {
  // VARIABLES =============================================================================================================================

  categories: PostCategorySelectO[] = [];
  first: Maybe<number> = 10;
  input!: PostCI;
  orderBy: Maybe<string> = null;
  selectedCategories: PostCategorySelectO[] = [];
  showPostCreate: boolean = false;
  skip: Maybe<number> = 0;

  get where() {
    return { category_in: this.selectedCategories.map(({ value }) => value) };
  }

  // LIFECYCLE ===============================================================================================================================

  created() {
    this.categories = postCategories.map((value) => ({ value, label: this.$t(`postCategories.${value}`) }));
    this.selectedCategories = [...this.categories];
    this.input = { category: this.categories[0], content: '', label: '' };
  }

  // LIFECYCLE ===============================================================================================================================

  onClickDelete(deleteOne: Function, id: string) {
    this.$q
      .dialog({ message: this.$t('confirmDeleteMessage') as string, title: this.$t('confirmDeleteTitle') as string })
      .onOk(() => deleteOne(id));
  }

  onSubmit() {
    console.log(this.input);
  }
}
</script>

<i18n>
fr:
  chipTotal: "sur {total}"
  confirmDeleteMessage: "Etes-vous sûr de vouloir supprimer cet article ?"
  confirmDeleteTitle: "Confirmation de suppression" 
  dialogTitle: "Nouvel Article"
  formCategory: "Catégorie"
  formContent: "Contenu"
  formLabel: "Titre"
  formSubmit: "Ajouter"
  title: "Articles"
</i18n>

<style lang="stylus" scoped>
.Create
  min-width 400px
</style>

