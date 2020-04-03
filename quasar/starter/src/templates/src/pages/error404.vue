<template lang="pug">
q-page(padding)
  q-toolbar: q-toolbar-title {{ $t('title') }}
  q-btn.Back(:label="$t('back')", @click="$router.push('/')")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

// COMPONENT ===============================================================================================================================

export default defineComponent({});
</script>

<i18n>
fr:
  back: "Retour à l'accueil"
  title: "Page inconnue"
</i18n>

<style lang="postcss" scoped>
.Back { @apply bg-secondary text-white }
</style>
