<template lang="pug">
.fixed-center.text-center
  p: img(src="~assets/images/sad.svg", style="width:30vw;max-width:150px;")
  p.text-faded 
    | Sorry, nothing here...
    strong (404)
  q-btn(color="secondary",style="width:200px;", @click="$router.push('/')") Go back
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({});
</script>
