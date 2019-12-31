import { boot } from '@niama/api';
import { getProvider, isEmpty } from '@niama/core';
import { getNavInitialData, getNavRS } from '@niama/nav';
import { setContext } from 'apollo-link-context';

import { menus } from '@/hasura-accounts/assets/data/menus';
import * as T from '@/hasura-accounts/types';

const prelink = setContext(async (_, { headers = {}, ...ctx }) => {
  const auth: T.Auth.Provider = getProvider('auth')!;
  const tokens = await auth.refreshSession();
  if (headers.Authorization !== undefined && isEmpty(headers.Authorization)) delete headers.Authorization;
  return { ...ctx, headers: { ...headers, ...(tokens ? { Authorization: `Bearer ${tokens.accessToken}` } : {}) } };
});

export default () => boot({  http: true, seeds: [() => getNavInitialData({ menus })], prelink, resolvers: [getNavRS()] });
