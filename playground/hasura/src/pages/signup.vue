<template lang="pug">
q-page.tw-flex.tw-items-center.tw-justify-center: q-card.tw-w-full.tw-max-w-lg
  q-card-section.tw-mb-4.tw-text-lg {{ $t('title') }}
  q-card-section: q-form(@submit="source$.next()")
    q-input.tw-mb-2(v-model="input.username", :label="$t('fUsername')", outlined)
    q-input.tw-mb-2(v-model="input.email", :label="$t('fEmail')", outlined)
    q-input.tw-mb-6(v-model="input.password", type="password", :label="$t('fPassword')", outlined)
    .tw-flex.tw-justify-end: q-btn.tw-bg-primary.tw-text-white(type="submit", :loading="loading", unelevated) {{ $t('btnSubmit') }}
</template>

<script lang="ts">
import { useSignup } from '@niama/auth';
import { defineComponent, reactive } from '@vue/composition-api';
import { getMutation, useMutation } from '@niama/api';
import { getSourcable, notifyError$, useI18n, notifySuccess } from '@niama/core';

// COMPONENT ===============================================================================================================================

export default defineComponent({
  setup() {
    const $niama = { i18n: useI18n() };
    const input: Signup = reactive({ email: '', password: '', username: '' });

    const sendEmail$ = useMutation<Function, { email: string }>({
      mutation: getMutation({ selector: 'sendVerificationEmail', varTypes: { email: 'String!' } }),
      onSuccess: () => notifySuccess({ $niama, messageId: 'youhou' }),
    });

    const createUser$ = useMutation<Function | null, { user: Signup }>({
      mutation: getMutation({ selector: 'createUser', varTypes: { user: 'CreateUserInput!' } }),
      error$: (error) => notifyError$({ $niama, error }),
      success$: () => sendEmail$({ email: input.email }),
    });

    const { loading, source$ } = getSourcable(() => createUser$({ user: input }));
    return { input, loading, source$ };
    //return useSignup();
  },
});

// TYPES ===================================================================================================================================

export interface Signup {
  email: string;
  password: string;
  username: string;
}
</script>

<i18n>
  fr:
    btnSubmit: "Je m'enregistre"
    fEmail: "Courriel"
    fPassword: "Mot de passe"
    fUsername: "Identifiant"
    title: "Inscription"
</i18n>
