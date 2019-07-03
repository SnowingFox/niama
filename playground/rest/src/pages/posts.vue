<template lang="pug">
  q-page
    h1.text-h3 Derniers articles
    d-posts(v-slot="{ fetchMore, items }"): q-infinite-scroll(@load="fetchMore", :offset="250")
      q-list(separator): q-item(v-for="{ body, id, title, author } of items", :key="id", :to="`articles/${id}`"): q-item-section
        q-item-label {{ id }} - {{ title }}
        q-item-label(caption) {{ body }}
      template(#loading=""): .row.justify-center.q-my-md: q-spinner-dots(color="primary", size="40px")
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { PostRP as DPosts } from '@/modules/post/post.component.repository';

@Component({ components: { DPosts } })
export default class PostsP extends Vue {}
</script>