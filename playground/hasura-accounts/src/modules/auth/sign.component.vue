<template lang="pug">
div
  q-btn(v-if="isAuthenticated", icon="ion-log-out", @click="signout$.next()", flat, round)
  q-btn(v-else, icon="ion-log-in", flat, round)
    q-menu(:offset="[0,20]", max-width="20rem"): q-form.tw-p-2(@submit="signin$.next(input)")
      q-chip.tw-mb-2.tw-bg-transparent.tw-font-semibold.tw-uppercase(icon="ion-contact") {{ $t('signin.title') }}
      q-input.tw-mb-2(v-model="input.email", :label="$t('signin.email')", outlined)
      q-input.tw-mb-2(v-model="input.password", type="password", :label="$t('signin.password')", outlined)
      q-btn.tw-mb-1.tw-w-full.tw-bg-primary.tw-text-white(type="submit", :label="$t('signin.submit')", :loading="loading", unelevated)
      q-btn.tw-w-full.tw-italic.tw-text-grey-8(flat, no-caps) {{ $t('forgotten') }}
</template>

<script lang="ts">
import { useIsAuthenticated, useSignin, useSignout } from '@niama/auth';
import { useInput, useSourcable } from '@niama/core';
import { useQuery, useResult } from '@vue/apollo-composable';
import { createComponent, ref } from '@vue/composition-api';
import gql from 'graphql-tag';

import * as T from '@/hasura-accounts/types';

// COMPONENT ===============================================================================================================================

export default createComponent({
  setup() {
    const { input } = useInput<T.Auth.Signin>({ password: '', email: '' });
    const signin = useSignin({ notify: true });
    const { loading, src$: signin$ } = useSourcable(signin);

    const { result } = useQuery(
      gql`
        query isAuthenticated {
          isAuthenticated @client
        }
      `
    );
    const isAuthenticated = useResult(result);

    /*const isAuthenticated: T.Ref<boolean> = ref(false);
    const { src$: isAuthenticated$ } = useSourcable<any, any, any>({
      switcher: useIsAuthenticated(),
      next: (v) => (isAuthenticated.value = v),
    });
    isAuthenticated$.next();*/

    const signout = useSignout();
    const { src$: signout$ } = useSourcable(signout);

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