import { fill, setProvider } from '@niama/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { provide } from '@vue/composition-api';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { defer } from 'rxjs';

import * as T from './types';

export const bootApi = async (p: T.BootApiP = {}): Promise<void> => {
  const opts: T.BootApiO = { ...fill(false, 'debug', 'http', 'rest', 'secured', 'ws'), ...fill([], 'resolvers', 'seeds'), ...p };
  const { debug, resolvers, seeds }: T.BootApiO = opts;

  const cache: T.InMemoryCache = new InMemoryCache();
  const data: T.NormalizedCacheObject = await processSeeds(seeds);
  if (debug) console.log('NIAMA API (boot) - initial data :', data);
  cache.writeData({ data });

  const provider: T.Provider = new ApolloClient({ cache, resolvers, link: await getLink(opts), typeDefs: [] }) as T.Provider;
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

const getUri = ({ secured = false, type }: { secured?: boolean; type: 'http' | 'ws' }): string => {
  const { NIAMA_API_HOST: HOST, NIAMA_API_PATH: PATH, NIAMA_API_PORT: PORT } = process.env;
  return `${type}${secured ? 's' : ''}://${HOST || 'localhost'}${PORT ? ':' + PORT : ''}${PATH ? '/' + PATH : ''}`;
};

// LINK ====================================================================================================================================

const getLink = async ({ debug, http, prelink, secured, ws, rest }: T.BootApiO): Promise<T.ApolloLink> => {
  if (rest) {
    const { RestLink } = await import('apollo-link-rest');
    const opts: T.RestLinkO = {
      uri: getUri({ secured, type: 'http' }),
      responseTransformer: async (r) => (r.url.endsWith('_limit=0') ? +r.headers.get('x-total-count') : await r.json()),
      ...(typeof rest === 'boolean' ? {} : rest),
    };
    const link = new RestLink(opts);
    return prelink ? prelink.concat(link) : link;
  }

  let httpLink!: T.HttpLink;
  let wsLink!: T.WebSocketLink;

  if (http) {
    const { HttpLink } = await import('apollo-link-http');
    const opts: T.HttpLinkO = {
      credentials: 'include',
      uri: getUri({ secured, type: 'http' }),
      ...(typeof http === 'boolean' ? {} : http),
    };
    if (debug) console.log('NIAMA API (boot) - HTTP Link :', opts);
    httpLink = new HttpLink(opts);
  }

  if (ws) {
    const { WebSocketLink } = await import('apollo-link-ws');
    wsLink = new WebSocketLink({ options: { reconnect: true }, uri: getUri({ type: 'ws' }) });
  }

  const splitter = ({ query }): boolean => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  };

  const link = httpLink && wsLink ? split(splitter, wsLink, httpLink) : httpLink || wsLink || new ApolloLink();
  return prelink ? prelink.concat(link) : link;
};

// SEEDS ===================================================================================================================================

const processSeeds = async (seeds: T.Seed[]): Promise<T.NormalizedCacheObject> =>
  (await Promise.all(seeds.map((seed) => seed()))).reduce<T.NormalizedCacheObject>((acc, data) => ({ ...acc, ...data }), {});
