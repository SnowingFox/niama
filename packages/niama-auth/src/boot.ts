import { getProvider, hasProvider, setProvider } from '@niama/core';

import { getRS, getSeed } from './api';
import * as T from './types';

export function boot(p: T.BootP, initProvider: (p: T.InitProviderP) => T.Provider) {
  if (!hasProvider('api')) throw new Error('auth.boot.error.API_UNDEFINED');
  const api: T.Api.Provider = getProvider('api') as T.Api.Provider;
  const provider: T.Provider = initProvider({ ...p, api });
  setProvider({ id: 'auth', provider });

  api.addSeed(getSeed(provider));
  api.addResolvers(getRS());

  // api.addResolvers({})
  // api.writeData({ data: auth: getIni})
  /*const current: T.Current<C['Role']> = await rest.getCurrent();
  const auth: T.Provider<C> = { signedInRoute: '', signedOutRoute: 'signin', ...rest, current };
  Vue.prototype.$auth = auth;

  router.beforeEach((to, _from, next) => {
    const authenticatedRequired: boolean = to.matched.some(({ meta: { authenticated } }) => authenticated === true);
    const unauthenticatedRequired: boolean = to.matched.some(({ meta: { authenticated } }) => authenticated === false);

    /*await app.apolloProvider.defaultClient.mutate({
      mutation: api.requests.setAuthorizedRoles,
      variables: { roles: [...to.matched].pop().meta.authorized || [] },
    });*

    if (unauthenticatedRequired && !!auth.current.id) return next({ name: auth.signedInRoute });
    if (authenticatedRequired && !auth.current.id) return next({ name: auth.signedOutRoute });
    return next();
  });*/
}
