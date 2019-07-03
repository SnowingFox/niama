import { pick } from '@niama/core';
import axios from 'axios';
import Vue from 'vue';
import Component from 'vue-class-component';

import { AuthToken } from '../universal/u.auth-token.model.entity';
import { api } from './f.auth.helper';

@Component({
  apollo: {
    /*fullName: {
      query: nUserRequests.readMe(['label']),
      update: (data) => (data ? data.me.label : ''),
    },*/
    /*options: {
      query: nAuthRequests.authorizedRoles,
      update: ({ authorizedRoles }) => authorizedRoles,
      variables() {
        return { authorized: this.$route.meta.authorized };
      },
    },*/
    authorizedRoles: {
      query: api.requests.authorizedRoles,
      update: (data) => (data ? data[api.labels.AUTHORIZED_ROLES] : []),
    },
    selectedRole: {
      query: api.requests.selectedRole,
      update: (data) => (data ? data[api.labels.SELECTED_ROLE] : null),
    },
    token: {
      query: api.requests.token,
      update: (data) => (data && data[api.labels.TOKEN] ? new AuthToken(data[api.labels.TOKEN]) : null),
    },
  },
})
export class AuthRP<Role extends string = string> extends Vue {
  // VARIABLES =============================================================================================================================

  authorizedRoles: Role[] = [];
  loading: boolean = false;
  selectedRole: N.Maybe<Role> = null;
  token: N.Maybe<AuthToken<Role>> = null;

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  // LIFECYCLE =============================================================================================================================

  async created() {
    await this.fetch();
    // const { data }: N.ApiQR<Role[]> = await this.$apollo.query({ query: api.requests.authorizedRoles });
    //this.authorizedRoles = data ? data[api.labels.AUTHORIZED_ROLES] : [];
  }

  render() {
    if (this.$scopedSlots.default) return this.$scopedSlots.default(pick(this, ['isAuthenticated', 'loading']));
  }

  // METHODS ===============================================================================================================================

  async fetch() {
    this.token = await this.readToken();
  }

  async readToken(): Promise<N.Maybe<AuthToken<Role>>> {
    this.loading = true;
    const { data }: N.ApiQR<AuthToken<Role>> = await this.$apollo.query({ query: api.requests.token });
    if (!data) console.warn('NIAMA AUTH - Auth has not been initialized in Apollo.');
    this.loading = false;
    return data ? data[api.labels.TOKEN] : null;
  }

  async selectRole(role: Role) {
    this.loading = true;
    await this.$apollo.mutate({ mutation: api.requests.setSelectedRole, variables: { role } });
    this.loading = false;
  }

  signin(signinI: N.AuthSigninI): N.AxiosPromise {
    return axios.post('/api/signin', signinI);
  }

  signout(): N.AxiosPromise {
    return axios.delete('/api/signout');
  }

  signup(signupI: N.AuthSignupI): N.AxiosPromise {
    return axios.post('/api/signup', signupI);
  }
}
