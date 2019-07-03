import { getError } from '@niama/api/front';
import { pick } from '@niama/core';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { signupDI } from '../universal/u.auth.helper';
import { AuthRP } from './f.auth.component.repository';

@Component
export class AuthSignupC extends mixins(AuthRP) {
  // VARIABLES =============================================================================================================================

  @Prop({ default: '/admin', type: String }) signinUrl!: string;

  loading = false;
  signupI: N.AuthSignupI = signupDI;

  // LIFECYCLE =============================================================================================================================

  errorCaptured() {
    this.loading = false;
  }
  
  render() {
    if (!this.$scopedSlots.default) return;
    return this.$scopedSlots.default({ ...pick(this, ['loading', 'signupI']), signup: this.processSignup });
  }

  // METHODS ===============================================================================================================================

  async processSignup() {
    this.loading = true;
    try {
      await this.signup(this.signupI);
      await this.$apollo.provider.defaultClient.resetStore();
      this.$router.push('/admin');
    } catch (error) {
      console.log(error);
      this.$q.notify({ color: 'negative', icon: 'report', message: getError(error), position: 'top' });
    }
    this.loading = false;
  }
}
