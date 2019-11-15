<template lang="pug">
  .fixed-center.text-center
    p: img(src="~assets/images/sad.svg", style="width:30vw;max-width:150px;")
    p.text-faded 
      | Sorry, nothing here...
      strong (404)
    q-btn(color="secondary",style="width:200px;", @click="$router.push('/')") Go back
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Error404P extends Vue {}
</script>
