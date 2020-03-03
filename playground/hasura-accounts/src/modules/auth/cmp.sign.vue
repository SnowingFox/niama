<template lang="pug">
div
  q-btn(v-if="isAuthenticated", icon="ion-log-out", @click="signout$.next()", flat, round)
  q-btn(v-else, icon="ion-log-in", flat, round)
    q-menu(:offset="[0,20]", max-width="20rem"): q-form._p-2(@submit="signin$.next(input)")
      q-chip._mb-2._bg-transparent._font-semibold._uppercase(icon="ion-contact") {{ $t('signin.title') }}
      q-input._mb-2(v-model="input.email", :label="$t('signin.email')", outlined)
      q-input._mb-2(v-model="input.password", type="password", :label="$t('signin.password')", outlined)
      q-btn._mb-1._w-full._bg-primary._text-white(type="submit", :label="$t('signin.submit')", :loading="loading", unelevated)
      q-btn._w-full._italic._text-grey-8(flat, no-caps) {{ $t('forgotten') }}
</template>

<script lang="ts">
import { useSigninS$, useSignoutS$, useIsAuthenticated } from '@niama/auth';
import { useInput } from '@niama/core';
import { defineComponent } from '@vue/composition-api';

import * as T from '@/hasura-accounts/types';

// COMPONENT ===============================================================================================================================

export default defineComponent({
  setup() {
    const { input } = useInput<T.Auth.Signin>({ password: '', email: '' });
    const { loading, src$: signin$ } = useSigninS$({ notify: true });
    const { src$: signout$ } = useSignoutS$();
    const isAuthenticated = useIsAuthenticated();
    return { input, isAuthenticated, loading, signin$, signout$ };
  },
});
</script>

<i18n>
  fr:
    forgotten: "J'ai oublié mon mot de passe"
    signin:
      email: "Courriel"
      password: "Mot de passe" 
      submit: "Je me connecte"
      title: "Mes identifiants"
</i18n>