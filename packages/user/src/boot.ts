import { getProvider, hasProvider } from '@niama/core';

import { getSeed } from './api';
import * as T from './types';

export const boot = async (p: T.BootP = {}) => {
  if (!hasProvider('api')) throw new Error('boot.UndefinedApi');
  const $api: T.Api.Provider = getProvider('api');
  await $api.addSeed(() => getSeed(p));
};
