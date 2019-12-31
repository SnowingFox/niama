<template lang="pug">
q-page.tw-flex.tw-items-center.tw-justify-center: q-card.tw-w-full.tw-max-w-lg
  q-card-section.tw-mb-4.tw-text-lg  {{ $t('title') }}
  q-card-section: q-form
    q-input.tw-mb-2(v-model="input.email", :label="$t('field.email')", outlined, readonly)
    q-input.tw-mb-2(v-model="input.firstname", :label="$t('field.firstname')", outlined, readonly)
    q-input.tw-mb-2(v-model="input.lastname", :label="$t('field.lastname')", outlined, readonly)
</template>

<script lang="ts">
import { useGetCurrent } from '@niama/auth';
import { createComponent } from '@vue/composition-api';
import { useInput, useSourcable, pick } from '@niama/core';

// COMPONENT ===============================================================================================================================

export default createComponent({
  setup() {
    const { input } = useInput({ email: '', firstname: '', lastname: '' });

    const getCurrent = useGetCurrent({
      onDone: (user) => {
        if (!user) return;
        input.value = { ...pick(user.profile, ['firstname', 'lastname']), email: user.emails[0].address };
      },
    });
    const { src$ } = useSourcable(getCurrent);
    src$.next();
    return { input };
  },
});
</script>

<i18n>
  fr:
    field:
      email: "Courriel"
      firstname: "Prénom"
      lastname: "Nom"
    title: "Mon Profil"
</i18n>
