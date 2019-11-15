<template lang="pug">
q-page.q-mx-auto.Page(padding): q-toolbar.q-mb-md.bg-primary.text-white: q-toolbar-title {{ $t('title') }}
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';

export default createComponent({});
</script>

<i18n>
fr:
  title: "Me contacter"
</i18n>
