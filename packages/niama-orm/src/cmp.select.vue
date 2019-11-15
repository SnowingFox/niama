<template lang="pug">
  q-select(option-value="id", @filter="filter", v-bind="$attrs" v-on="$listeners")
    template(v-if="noOption", #no-option=""): q-item(): q-item-section {{ noOption }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class OrmSelectC extends Vue {
  // VARIABLES =============================================================================================================================

  @Prop() fetch!: Function;
  @Prop(String) noOption!: string;

  // METHODS ===============================================================================================================================

  async filter(_, update) {
    if (this.fetch) await this.fetch();
    update();
  }
}
</script>
