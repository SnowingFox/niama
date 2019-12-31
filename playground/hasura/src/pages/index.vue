<template lang="pug">
q-page.Page(padding)
  q-btn(@click="signin({ username: 'tut', password: 'tot' })") Connexion
  //-q-toolbar.bg-primary.text-white
    q-toolbar-title {{ $t('title') }}
    q-select(v-model="selectedCategories", :options="categories", multiple, use-chips)
    q-chip
      q-avatar.bg-info.text-white {{ count }}
      | {{ $t('chipTotal', { total }) }}
    q-btn(icon="add", flat, dense, rounded, @click="showPostCreate = true")
  q-linear-progress.q-mb-md(query, color="info", :class="{ 'invisible' : !loading }")
  
  //-q-infinite-scroll(@load="fetchMore")
  .row.q-col-gutter-lg: .col-12.col-sm-6.col-md-4(v-for="post of posts", :key="post.id")
    q-card
      //-q-img.cursor-pointer.bg-grey-4(:src="item.image", :ratio="3/2", @click="$router.push({ name: 'post', params: { id: item.id }})")
        template(#error=""): .absolute-full.flex.flex-center.bg-negative.text-white: q-icon(name="photo", size="4rem")
      q-card-section.row.items-center
        .col
          .text-h6.text-uppercase {{ post.title }}
          //-.text-caption.text-accent {{ $t(`postCategories.${item.category}`) }}
        q-btn(icon="edit", flat, dense, rounded, color="info")
        q-btn(icon="delete", flat, dense, rounded, color="negative", @click="onClickDelete(deleteOne, item.id)")
      q-card-section: .ellipsis-2-lines {{ post.content }}

    //-template(#loading=""): .row.justify-center.q-my-md: q-spinner-dots(color="primary", size="40px")

  //-q-dialog(v-model="showPostCreate", position="right"): q-card.Create: q-form(@submit="onSubmit")
    q-toolbar.bg-secondary.text-white: q-toolbar-title {{ $t('dialogTitle') }}
    q-card-section.q-gutter-md
      q-select(v-model="input.category", :label="$t('formCategory')", :options="categories", filled)
      q-input(v-model="input.label", :label="$t('formLabel')", filled)
      q-input(v-model="input.content", :label="$t('formContent')", type="textarea", filled)
    q-card-actions(align="right"): q-btn(type="submit", icon="add", color="primary", unelevated) {{ $t('formSubmit') }}
</template>

<script lang="ts">
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import { createComponent, watch } from '@vue/composition-api';
import { getQuery, getMutation } from '@niama/api';

// COMPONENT ===============================================================================================================================

export default createComponent({
  setup() {
    const { loading, result } = useQuery(getQuery({ selector: 'posts', fields: ['id', 'title', 'content'] }));
    const posts = useResult(result, []);
    const { result: rsBooks } = useQuery(getQuery({ selector: 'books', fields: ['title', 'author'] }));
    const books = useResult(rsBooks, []);
    watch(books, () => console.log(books.value));
    const { mutate: signin } = useMutation(getMutation({ selector: 'signin', varTypes: { password: 'String!', username: 'String!' } }));
    return { loading, posts, signin };
  },
});
</script>

<i18n>
fr:
  title: "Accueil"
</i18n>