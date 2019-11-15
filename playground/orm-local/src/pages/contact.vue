<template lang="pug">
  q-page.q-mx-auto.Page(padding): q-toolbar.q-mb-md.bg-primary.text-white: q-toolbar-title {{ $t('title') }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ContactP extends Vue {}
</script>

<i18n>
fr:
  title: "Me contacter"
</i18n>
