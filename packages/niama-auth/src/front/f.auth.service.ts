import { authApi, getAuthToken } from '@niama/auth/front';

export function authS<Role extends string>(options: N.AuthBootO = {}) {
  return ({ app, router }) => {
    const { authenticatedUri, signinUri }: N.AuthBootO = { authenticatedUri: '/admin', signinUri: '/signin', ...options };

    router.beforeEach(async (to, from, next) => {
      const token: N.Maybe<N.AuthToken<Role>> = getAuthToken();

      const authenticatedRequired: boolean = to.matched.some(({ meta: { authenticated } }) => authenticated === true);
      const unauthenticatedRequired: boolean = to.matched.some(({ meta: { authenticated } }) => authenticated === false);

      await app.apolloProvider.defaultClient.mutate({
        mutation: authApi.requests.setAuthorizedRoles,
        variables: { roles: [...to.matched].pop().meta.authorized || [] },
      });

      if (unauthenticatedRequired && !!token) return next(authenticatedUri);
      if (authenticatedRequired && !token) return next(signinUri);
      return next();

      // const isPublic = to.matched.some((record) => record.meta.public);
      // const unauthenticatedOnly = to.matched.some((record) => record.meta.unauthenticatedOnly);
      // const isAuthenticated = true; // !!TokenService.getToken();

      // if (!isPublic && !isAuthenticated) return next({ path: '/connexion', query: { redirect: to.fullPath } });
      // if (isAuthenticated && unauthenticatedOnly) return next('/');

      /*let error = null;
    if (!this.authS.isAuthenticated) error = { statusCode: 401, message: `Vous n'êtes pas authentifié(e).`, url };
    else if (!this.authS.isAuthorized(authorized)) error = { statusCode: 403, message: `Accès non autorisé.`, url };
    if (error) this.routerS.navigate(['/connexion'], { queryParams: { error: error.statusCode, redirect: error.url } });
    else this.authS.authorized$.next(authorized);
    return !error;*/

      // console.log(isAuthenticated);
    });
  };
}
