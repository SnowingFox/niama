<template lang="pug">
q-page.u-page(padding): q-toolbar.u-title: q-toolbar-title {{ $t('title') }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

// COMPONENT ===============================================================================================================================

export default defineComponent({});
</script>

<i18n>
fr:
  title: "A propos"
</i18n>
