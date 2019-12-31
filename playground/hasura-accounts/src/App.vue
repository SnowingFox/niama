<template lang="pug">
  #q-app: router-view
</template>

<script lang="ts">
import { provideNiama } from '@niama/core';
import { createComponent } from '@vue/composition-api';

import * as T from '@/hasura-accounts/types';

// COMPONENT ===============================================================================================================================

export default createComponent({
  setup(_p, context: T.SetupContext) {
    provideNiama(context);
  },
});
</script>
