<template lang="pug">
q-page.u-page(padding): q-toolbar.u-title: q-toolbar-title {{ $t('title') }}
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';

// COMPONENT ===============================================================================================================================

export default createComponent({});
</script>

<i18n>
fr:
  title: "Me contacter"
</i18n>
