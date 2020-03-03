<template lang="pug">
q-page._flex._items-center._justify-center: q-card._w-full._max-w-lg
  q-card-section._mb-4._text-lg  {{ $t('title') }}
  q-card-section: q-form(@submit="submit$.next(input)")
    q-input._mb-2(v-model="input.email", :label="$t('field.email')", outlined)
    q-input._mb-2(v-model="input.password", type="password", :label="$t('field.password')", outlined)
    ._flex._justify-end: q-btn._bg-primary._text-white(type="submit", :loading="loading", unelevated) {{ $t('submit') }}
</template>

<script lang="ts">
import { useSignin } from '@niama/auth';
import { defineComponent } from '@vue/composition-api';
import { useSourcable, useInput } from '@niama/core';

import * as T from '@/hasura-accounts/types';

// COMPONENT ===============================================================================================================================

export default defineComponent({
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
