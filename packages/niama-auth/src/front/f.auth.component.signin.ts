import { pick } from '@niama/core';
import Component, { mixins } from 'vue-class-component';

import { signinDI } from '../universal/u.auth.helper';
import { AuthRP } from './f.auth.component.repository';

@Component
export class AuthSigninC extends mixins(AuthRP) {
  // VARIABLES =============================================================================================================================

  loading = false;
  signinI: N.AuthSigninI = signinDI;

  // LIFECYCLE =============================================================================================================================

  errorCaptured() {
    this.loading = false;
  }

  render() {
    if (!this.$scopedSlots.default) return;
    return this.$scopedSlots.default({ ...pick(this, ['loading', 'signinI']), signin: this.processSignin });
  }

  // METHODS ===============================================================================================================================

  async processSignin() {
    this.loading = true;
    await this.signin(this.signinI);
    await this.$apollo.provider.defaultClient.resetStore();
    this.$router.push('/admin');
    this.loading = false;
  }
}
