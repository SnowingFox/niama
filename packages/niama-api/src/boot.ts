import { setProvider } from '@niama/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { provide } from '@vue/composition-api';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { RestLink } from 'apollo-link-rest';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { defer } from 'rxjs';

import * as T from './types';

// BOOT ====================================================================================================================================

export const bootApi = async (p: T.BootApiP = {}): Promise<void> => {
  const { http, secured = false, ws, ...rest } = p;
  const splitter = ({ query }): boolean => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  };
  await setApiProvider({ link: split(splitter, getWsLink(ws), getHttpLink({ secured, opts: http })), ...rest });
};

export const bootHttpApi = ({ opts, secured, ...rest }: T.BootHttpApiP = {}): Promise<void> =>
  setApiProvider({ link: getHttpLink({ opts, secured }), ...rest });

export const bootLocalApi = (p: T.BootLocalApiP = {}): Promise<void> => setApiProvider(p);

export const bootRestApi = ({ opts, secured, ...rest }: T.BootRestApiP = {}): Promise<void> =>
  setApiProvider({ link: getRestLink({ opts, secured }), ...rest });

export const bootWsApi = ({ opts, ...rest }: T.BootWsApiP = {}): Promise<void> => setApiProvider({ link: getWsLink(opts), ...rest });

// PROVIDER ================================================================================================================================

const setApiProvider = async (p: T.SetApiProviderP): Promise<void> => {
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

// HTTP ====================================================================================================================================

const getHttpLink = ({ opts, secured }: T.GetHttpLinkP): HttpLink =>
  new HttpLink({ credentials: 'include', uri: getUri({ secured, type: 'http' }), ...opts });

// REST ====================================================================================================================================

const getRestLink = ({ opts, secured }: T.GetRestLinkP): RestLink => new RestLink({ uri: getUri({ secured, type: 'http' }), ...opts });

// WS ======================================================================================================================================

const getWsLink = (opts?: T.WebSocketLinkO): WebSocketLink =>
  new WebSocketLink({ ...opts, options: { reconnect: true, ...opts?.options }, uri: opts?.uri ?? getUri({ type: 'ws' }) });

// URI =====================================================================================================================================

const getUri = ({ secured = false, type }: { secured?: boolean; type: 'http' | 'ws' }): string => {
  const { NIAMA_API_HOST: HOST, NIAMA_API_PATH: PATH, NIAMA_API_PORT: PORT } = process.env;
  return `${type}${secured ? 's' : ''}://${HOST || 'localhost'}${PORT ? ':' + PORT : ''}${PATH ? '/' + PATH : ''}`;
};

// SEEDS ===================================================================================================================================

const processSeeds = async (seeds: T.Seed[]): Promise<T.NormalizedCacheObject> =>
  (await Promise.all(seeds.map((seed) => seed()))).reduce<T.NormalizedCacheObject>((acc, data) => ({ ...acc, ...data }), {});
