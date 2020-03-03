<template lang="pug">
q-page._flex._items-center._justify-center: q-card._w-full._max-w-lg
  q-card-section._mb-4._text-lg  {{ $t('title') }}
  q-card-section: q-form
    q-input._mb-2(v-model="input.email", :label="$t('field.email')", outlined, readonly)
    q-input._mb-2(v-model="input.firstname", :label="$t('field.firstname')", outlined, readonly)
    q-input._mb-2(v-model="input.lastname", :label="$t('field.lastname')", outlined, readonly)
</template>

<script lang="ts">
// import { useGetCurrent } from '@niama/auth';
import { defineComponent } from '@vue/composition-api';
import { useInput, useSourcable, pick } from '@niama/core';

// COMPONENT ===============================================================================================================================

export default defineComponent({
  setup() {
    const { input } = useInput({ email: '', firstname: '', lastname: '' });

    /*const getCurrent = useGetCurrent({
      onDone: (user) => {
        if (!user) return;
        input.value = { ...pick(user.profile, ['firstname', 'lastname']), email: user.emails[0].address };
      },
    });
    const { src$ } = useSourcable(getCurrent);
    src$.next();*/
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
