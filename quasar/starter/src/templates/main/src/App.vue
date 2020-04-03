<template lang="pug">
#q-app: router-view
</template>

<script lang="ts">
import { provideNiama } from '@niama/core';
import { defineComponent } from '@vue/composition-api';

import * as T from '@/<%= pkg.name %>/types';

// COMPONENT ===============================================================================================================================

export default defineComponent({
  setup(_p, context: T.SetupContext) {
    provideNiama(context);
  },
});
</script>
