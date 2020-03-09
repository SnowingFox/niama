import { setProvider } from '@niama/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { provide } from '@vue/composition-api';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { defer } from 'rxjs';

import * as T from './types';

// PROVIDER ================================================================================================================================

export const setApiProvider = async (p: T.SetApiProviderP): Promise<void> => {
  const { cache: cacheO, debug = false, link: maybeLink, prelink, resolvers = [], seeds = [], typeDefs = [], ...rest } = p;
  const link = !maybeLink ? undefined : prelink ? prelink.concat(maybeLink) : maybeLink;
  const cache = new InMemoryCache(cacheO);
  const data: T.NormalizedCacheObject = await processSeeds(seeds);
  if (debug) console.log('NIAMA API (boot) - initial data :', data);
  cache.writeData({ data });

  const provider: T.Provider = new ApolloClient({ ...rest, cache, link, resolvers, typeDefs }) as T.Provider;
  provider.seeds = seeds;
  provider.addSeed = async <D extends object>(seed: T.Seed<D>): Promise<void> => {
    provider.seeds.push(seed);
    cache.writeData({ data: await seed() });
  };
  provider.onResetStore(async () => cache.writeData({ data: await processSeeds(provider.seeds) }));
  provider.resetStore$ = defer(async () => {
    await provider.resetStore();
  });

  setProvider({ provider, id: 'api', onInit: () => provide(DefaultApolloClient, provider) });
};

// URI =====================================================================================================================================

export const getUri = ({ secured = false, type }: { secured?: boolean; type: 'http' | 'ws' }): string => {
  const { NIAMA_API_HOST: HOST, NIAMA_API_PATH: PATH, NIAMA_API_PORT: PORT } = process.env;
  return `${type}${secured ? 's' : ''}://${HOST || 'localhost'}${PORT ? ':' + PORT : ''}${PATH ? '/' + PATH : ''}`;
};

// SEEDS ===================================================================================================================================

export const processSeeds = async (seeds: T.Seed[]): Promise<T.NormalizedCacheObject> =>
  (await Promise.all(seeds.map((seed) => seed()))).reduce<T.NormalizedCacheObject>((acc, data) => ({ ...acc, ...data }), {});
