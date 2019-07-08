import { intersection, pick } from '@niama/core';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { api } from './helper';
import { AuthRP } from './repository';

@Component({
  apollo: {
    me: {
      query() {
        return api.requests.me(this.fields);
      },
      skip() {
        return !this.fields;
      },
      update: (data) => (data ? data[api.labels.ME] : null),
    },
  },
})
export class AuthMeC<Role extends string, UserF extends N.UserF> extends mixins(AuthRP) {
  // VARIABLES =============================================================================================================================

  @Prop() fields!: UserF;

  me = null;

  get myAuthorizedRoles(): Role[] {
    return this.token ? (intersection(this.authorizedRoles, this.token.roles) as Role[]) : [];
  }

  // LIFECYCLE =============================================================================================================================

  render() {
    if (!this.$scopedSlots.default) return;
    return this.$scopedSlots.default({ ...pick(this, ['loading', 'me', 'myAuthorizedRoles', 'selectRole', 'selectedRole']) });
  }
}
