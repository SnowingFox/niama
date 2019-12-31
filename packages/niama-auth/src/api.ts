import { getQuery } from '@niama/api';

import * as T from './types';

// RESOLVER ================================================================================================================================

export const getSeed = (provider: T.Provider) => async () => {
  const info: T.Maybe<T.Info> = await provider.getInfo();
  return { auth: info ? { ...info, __typename: 'Auth' } : null };
};

export const getRS = () => ({
  Query: {
    isAuthenticated: async (_p, _v, { cache }) => {
      const { auth } = await cache.readQuery({ query: rp.ops.read });
      return !!auth;
    },
  },
});

// REPOSITORY ==============================================================================================================================

export const fields = ['id', 'role', 'roles'];

export enum labels {
  READ = 'auth',
}

export const ops = {
  read: getQuery({ selector: labels.READ, fields, local: true }),
};

export const rp = { labels, ops };
