<template lang="pug">
q-page.u-page
  q-linear-progress(v-if="loading", query)
  q-banner(v-else-if="error", inline-actions).tw-bg-negative.tw-text-white {{ $t('auth.VERIFY_EMAIL_FAIL') }}
    template(#action=""): q-btn(:label="$t('signup')", :to="{ name: 'signup' }", replace, outline)
  q-banner(v-else, inline-actions).tw-bg-positive.tw-text-white {{ $t('auth.VERIFY_EMAIL_DONE') }}
    template(#action=""): q-btn(:label="$t('signin')", :to="{ name: 'signin' }", replace, outline)
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';
import { useSourcable } from '@niama/core';
import { useVerifyEmail } from '@niama/auth';
import { of } from 'rxjs';

import * as T from '@/hasura-accounts/types';

// COMPONENT ===============================================================================================================================

export default createComponent({
  props: {
    token: { type: String, required: true },
  },
  setup(p: Props) {
    const error: T.Ref<T.Maybe<Error>> = ref(null);
    const verifyEmail = useVerifyEmail({
      fail$: (err) => {
        error.value = err;
        return of(null);
      },
    });
    const { loading, src$ } = useSourcable(verifyEmail);
    
    src$.next(p.token);
    
    return { error, loading };
  },
});

// TYPES ===============================================================================================================================

interface Props {
  token: string;
}
</script>

<i18n>
  fr:
    signin: "Je me connecte"
    signup: "Je me réinscris"
</i18n>
