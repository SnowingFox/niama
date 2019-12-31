<template lang="pug">
q-page.tw-flex.tw-items-center.tw-justify-center: q-card.tw-w-full.tw-max-w-lg
  q-card-section.tw-mb-4.tw-text-lg  {{ $t('title') }}
  q-card-section: q-form(@submit="submit$.next(input)")
    q-input.tw-mb-2(v-model="input.email", :label="$t('field.email')", outlined)
    q-input.tw-mb-2(v-model="input.password", type="password", :label="$t('field.password')", outlined)
    .tw-flex.tw-justify-end: q-btn.tw-bg-primary.tw-text-white(type="submit", :loading="loading", unelevated) {{ $t('submit') }}
</template>

<script lang="ts">
import { useSignin } from '@niama/auth';
import { createComponent } from '@vue/composition-api';
import { useSourcable, useInput } from '@niama/core';

import * as T from '@/hasura-accounts/types';

// COMPONENT ===============================================================================================================================

export default createComponent({
  setup() {
    const { input } = useInput<T.Auth.Signin>({ password: '', email: '' });
    const signin = useSignin({ notify: true });
    const { loading, src$: submit$ } = useSourcable(signin);
    return { input, loading, submit$ };
  },
});
</script>

<i18n>
  fr:
    field:
      password: "Mot de passe" 
      email: "Courriel"
    submit: "Je me connecte"
    title: "Connexion"
</i18n>
