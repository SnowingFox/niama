<template lang="pug">
q-btn(label="notifyDone", @click="onClickNotifyDone")
</template>

<script lang="ts">
import { notifyDone } from '@niama/core';
import { defineComponent } from '@vue/composition-api';

/**
 * Use `Badge` to highlight key info with a predefined status.
 */
export default defineComponent({
  setup() {
    const onClickNotifyDone = () => notifyDone('notified');

    return { onClickNotifyDone };
  },
});
</script>