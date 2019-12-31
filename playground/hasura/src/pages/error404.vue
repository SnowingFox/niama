<template lang="pug">
q-page.u-page(padding)
  q-toolbar.u-title: q-toolbar-title {{ $t('title') }}
  q-btn.Back(:label="$t('back')", @click="$router.push('/')")
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';

// COMPONENT ===============================================================================================================================

export default createComponent({});
</script>

<i18n>
fr:
  back: "Retour à l'accueil"
  title: "Page inconnue"
</i18n>

<style lang="postcss" scoped>
.Back { @apply tw-bg-secondary tw-text-white }
</style>
