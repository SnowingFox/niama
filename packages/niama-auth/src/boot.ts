import * as T from './types';

export async function boot<C extends T.Config>({ Vue, router, ...rest }: T.BootP<C>) {
  const current: T.Current<C['Role']> = await rest.getCurrent();
  const auth: T.Provider<C> = { signedInRoute: '', signedOutRoute: 'signin', ...rest, current };
  Vue.prototype.$auth = auth;

  router.beforeEach((to, _from, next) => {
    const authenticatedRequired: boolean = to.matched.some(({ meta: { authenticated } }) => authenticated === true);
    const unauthenticatedRequired: boolean = to.matched.some(({ meta: { authenticated } }) => authenticated === false);

    /*await app.apolloProvider.defaultClient.mutate({
      mutation: api.requests.setAuthorizedRoles,
      variables: { roles: [...to.matched].pop().meta.authorized || [] },
    });*/

    if (unauthenticatedRequired && !!auth.current.id) return next({ name: auth.signedInRoute });
    if (authenticatedRequired && !auth.current.id) return next({ name: auth.signedOutRoute });
    return next();
  });
}
