<template lang="pug">
  q-btn(:color="color", v-bind="$attrs" v-on="$listeners")
    q-tooltip(v-if="tooltip", :content-class="tooltipClass", transition-hide="scale", transition-show="scale") {{ tooltip }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class UiBtnC extends Vue {
  // VARIABLES =============================================================================================================================

  @Prop() color!: string;
  @Prop() tooltip!: N.Maybe<string>;

  get tooltipClass(): string {
    return `bg-${this.color}`;
  }
}
</script>
