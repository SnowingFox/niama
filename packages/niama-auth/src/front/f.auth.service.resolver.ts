import { AuthToken } from '../universal/u.auth-token.model.entity';
import { api, getToken } from './f.auth.helper';

export function getInitialData<Role extends string>(): N.AuthCacheData<Role> {
  const token: N.Maybe<AuthToken<Role>> = getToken();
  return { authAuthorizedRoles: [], authToken: token ? token.toResource() : null, authSelectedRole: token ? token.firstRole : null };
}

export function getRS<Role extends string>(): N.Resolvers {
  return {
    Mutation: {
      authSetAuthorizedRoles: (_: any, { roles: authAuthorizedRoles }: { roles: Role[] }, { cache }: { cache: N.InMemoryCache }) =>
        cache.writeQuery({ query: api.requests.authorizedRoles, data: { authAuthorizedRoles } }),
      authSetSelectedRole: (_: any, { role: authSelectedRole }: { role: Role }, { cache }: { cache: N.InMemoryCache }) =>
        cache.writeQuery({ query: api.requests.selectedRole, data: { authSelectedRole } }),
    },
  };
}
