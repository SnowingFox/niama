import { getProvider, hasProvider, setProvider } from '@niama/core';

import { getSeed, queryIsAuthenticated } from './api';
import * as T from './types';
import { getError } from './utils';

export const bootAuth = async ({ initProvider, opts }: T.BootAuthP) => {
  if (!hasProvider('api')) throw getError('boot.UndefinedApi');

  const provider = initProvider(opts);
  setProvider({ id: 'auth', provider });

  const $api = getProvider('api');
  await $api.addSeed(getSeed(provider));
  // $api.addResolvers(getRS());

  opts.router.beforeEach(async (to, _from, next) => {
    const authenticatedRequired = to.matched.some(({ meta: { authenticated } }) => authenticated === true);
    if (authenticatedRequired && !opts.authenticatedRoute) throw getError('boot.UndefinedAuthenticatedRoute');
    const unauthenticatedRequired = to.matched.some(({ meta: { authenticated } }) => authenticated === false);
    if (unauthenticatedRequired && !opts.unauthenticatedRoute) throw getError('boot.UndefinedUnauthenticatedRoute');

    const isAuthenticated = await queryIsAuthenticated();
    if (unauthenticatedRequired && isAuthenticated) return next(opts.authenticatedRoute);
    if (authenticatedRequired && !isAuthenticated) return next(opts.unauthenticatedRoute);
    return next();
  });
};
