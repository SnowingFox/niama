import { getQuery } from '@niama/api';
import { getProvider } from '@niama/core';

import * as T from './typings';
import { getError, header, isAuthenticated } from './utils';

// REPOSITORY ==============================================================================================================================

const L: T.Labels = { read: 'auth' };
export const rp: T.Rp = { L, O: { read: getQuery({ selector: L.read, fields: ['accessToken', 'role', 'roles'], local: true }) } };

// QUERIES =================================================================================================================================

export const query = async (): Promise<T.Po> => {
  const $api = getProvider('api');
  const { data } = await $api.query<T.Api.QData<T.Po>>({ query: rp.O.read });
  if (!data) throw getError('fetchNull');
  return data[rp.L.read];
};

export const queryHeader = async (): Promise<T.Maybe<T.AuthorizationHeader>> => header(await query());
export const queryIsAuthenticated = async (): Promise<boolean> => isAuthenticated(await query());

// RESOLVER ================================================================================================================================

export const getSeed = ({ fetch, fromPayload }: T.Provider) => async (): Promise<T.Api.QData<T.Po>> => ({
  [rp.L.read]: fromPayload(await fetch()),
});

/*export const getRS = () => ({
  Auth: {
    header: (_p, _v, { cache }: { cache: T.Api.InMemoryCache }): T.Maybe<{ Authorization: string }> => {
      const data = cache.readQuery<{ auth: T.Po }>({ query: ops.read });
      return data?.auth ? { Authorization: `Bearer ${data?.auth.accessToken}` } : null;
    },
    isAuthenticated: (_p, _v, { cache }: { cache: T.Api.InMemoryCache }): boolean => {
      const data = cache.readQuery<{ auth: T.Po }>({ query: ops.read });
      return data?.auth.role !== 'PUBLIC';
    },
  },
});*/
