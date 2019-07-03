<template lang="pug">
  q-page: q-card
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import gql from 'graphql-tag';

// import { PostRP as DPosts } from '@/modules/post/post.component.repository';

@Component({
  apollo: {
    post: {
      query: gql`
        query post($id: String!) {
          post(id: $id) @rest(type: "Post", path: "/posts/{args.id}") {
            body
            id
            title
            userId @export(as: "userId")
            author @rest(type: "User", path: "/users/{exportVariables.userId}") {
              id
              name
              username
            }
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id };
      },
    },
  },
})
export default class PostP extends Vue {}
</script>