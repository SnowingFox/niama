<template lang="pug">
q-page.u-page(padding)
  q-linear-progress(v-if="loading", query)
  q-banner(v-else-if="error") {{ error.message }}
    template(#avatar): q-icon(name="warning")
  q-list(v-else, bordered, separator): q-item(v-for="post of posts", :key="post.id"): q-item-section {{ post.title }} 
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { useReadPosts } from '@/hasura-accounts/modules/post';

// COMPONENT ===============================================================================================================================

export default defineComponent({
  setup() {
    const { error, items: posts, loading } = useReadPosts();
    return { error, loading, posts }; // use networkStatus instead of error till vue-apollo fixes the issue
  },
});
</script>

<i18n>
fr:
  title: "Accueil"
</i18n>

<style lang="postcss" scoped>
.q-banner { @apply _bg-negative _text-white }
</style>