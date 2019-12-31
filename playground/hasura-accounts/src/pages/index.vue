<template lang="pug">
q-page.u-page(padding)
  q-linear-progress(v-if="loading", query)
  q-banner(v-else-if="networkStatus === 8") {{ error.message }}
    template(#avatar): q-icon(name="warning")
  q-list(v-else, bordered, separator): q-item(v-for="post of posts", :key="post.id"): q-item-section {{ post.title }} 
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { useQuery, useResult } from '@vue/apollo-composable';

import { rp } from '@/hasura-accounts/modules/post/api';

// COMPONENT ===============================================================================================================================

export default createComponent({
  setup() {
    const { error, loading, networkStatus, result } = useQuery(rp.ops.readAll);
    const posts = useResult(result, []);
    return { error, loading, networkStatus, posts }; // use networkStatus instead of error till vue-apollo fixes the issue
  },
});
</script>

<i18n>
fr:
  title: "Accueil"
</i18n>

<style lang="postcss" scoped>
.q-banner { @apply tw-bg-negative tw-text-white }
</style>