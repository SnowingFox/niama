<template lang="pug">
  #q-app: router-view
</template>

<script lang="ts">
import { provideApi } from '@niama/api';
import { provideAuth } from '@niama/auth';
import { provideRouter, provideI18n } from '@niama/core';
import { createComponent } from '@vue/composition-api';

import * as T from '@/hasura/types';

// COMPONENT ===============================================================================================================================

export default createComponent({
  setup(_p, { root: { $api, $auth, $i18n, $router } }: T.SetupContext) {
    provideAuth($auth);
    provideI18n($i18n);
    provideRouter($router);
    provideApi($api);
  },
});
</script>
