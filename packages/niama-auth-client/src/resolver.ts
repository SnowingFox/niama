import { AuthToken } from '@niama/auth';
import { Maybe } from '@niama/core';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Resolvers } from 'apollo-client';

import { api, getToken } from './helper';
import { AuthCacheData } from './types';

export function getInitialData<Role extends string>(): AuthCacheData<Role> {
  const token: Maybe<AuthToken<Role>> = getToken();
  return { authAuthorizedRoles: [], authToken: token ? token.toResource() : null, authSelectedRole: token ? token.firstRole : null };
}

export function getRS<Role extends string>(): Resolvers {
  return {
    Mutation: {
      authSetAuthorizedRoles: (_: any, { roles: authAuthorizedRoles }: { roles: Role[] }, { cache }: { cache: InMemoryCache }) =>
        cache.writeQuery({ query: api.requests.authorizedRoles, data: { authAuthorizedRoles } }),
      authSetSelectedRole: (_: any, { role: authSelectedRole }: { role: Role }, { cache }: { cache: InMemoryCache }) =>
        cache.writeQuery({ query: api.requests.selectedRole, data: { authSelectedRole } }),
    },
  };
}
