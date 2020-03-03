<template lang="pug">
q-page.q-mx-auto.Page(padding): q-toolbar.q-mb-md.bg-primary.text-white: q-toolbar-title {{ $t('title') }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({});
</script>

<i18n>
fr:
  title: "A propos"
</i18n>
