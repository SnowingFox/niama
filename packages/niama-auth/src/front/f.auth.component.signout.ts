
import { pick } from '@niama/core';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { AuthRP } from './f.auth.component.repository';

@Component
export class AuthSignoutC extends mixins(AuthRP) {
  // VARIABLES =============================================================================================================================

  @Prop({ default: '/', type: String }) signoutUrl!: string;
  
  loading = false;

  // LIFECYCLE =============================================================================================================================

  errorCaptured() {
    this.loading = false;
  }
  
  render() {
    if (!this.$scopedSlots.default) return;
    return this.$scopedSlots.default({ ...pick(this, ['loading']), signout: this.processSignout });
  }

  // METHODS ===============================================================================================================================

  async processSignout() {
    this.loading = true;
    await this.signout();
    await this.$apollo.provider.defaultClient.resetStore();
    this.$router.replace(this.signoutUrl);
    this.loading = false;
  }
}
