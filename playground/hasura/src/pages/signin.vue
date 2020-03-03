<template lang="pug">
q-page.tw-flex.tw-items-center.tw-justify-center: q-card.tw-w-full.tw-max-w-lg
  q-card-section.tw-mb-4.tw-text-lg  {{ $t('title') }}
  q-card-section: q-form(@submit="source$.next()")
    q-input.tw-mb-2(v-model="input.username", :label="$t('fUsername')", outlined)
    q-input.tw-mb-2(v-model="input.password", type="password", :label="$t('fPassword')", outlined)
    .tw-flex.tw-justify-end: q-btn.tw-bg-primary.tw-text-white(type="submit", :loading="loading", unelevated) {{ $t('btnSubmit') }}
</template>

<script lang="ts">
import { useMutation } from '@niama/api';
import { useSignin } from '@niama/auth';
import { defineComponent, reactive } from '@vue/composition-api';
import { getMutation } from '@niama/api';
import { getSourcable, notifyError$, useI18n } from '@niama/core';

// COMPONENT ===============================================================================================================================

export default defineComponent({
  setup() {
    const $niama = { i18n: useI18n() };
    const input: Signin = reactive({ password: '', username: '' });

    const signin$ = useMutation({
      mutation: getMutation({
        selector: 'authenticate',
        fields: { _: ['sessionId'], tokens: ['accessToken', 'refreshToken'] },
        varTypes: { serviceName: 'String!', params: 'AuthenticateParamsInput!' },
      }),
      error$: (error) => notifyError$({ $niama, error }),
    });

    const { loading, source$ } = getSourcable(() =>
      signin$({ serviceName: 'password', params: { password: input.password, user: { username: input.username } } })
    );
    // const { input, loading, source$ } = useSignin({ debug: true });
    return { input, loading, source$ };
  },
});

// TYPES ===================================================================================================================================

export interface Signin {
  password: string;
  username: string;
}
</script>

<i18n>
  fr:
    btnSubmit: "Je me connecte"
    fPassword: "Mot de passe"
    fUsername: "Identifiant"
    title: "Connexion"
</i18n>
