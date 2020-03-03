import { fill, setProvider } from '@niama/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { provide } from '@vue/composition-api';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { defer } from 'rxjs';

import * as T from './types';

export const bootApi = async (p: T.BootApiP) => {
  const opts: T.BootApiO = { ...fill(false, 'debug', 'http', 'rest', 'secured', 'ws'), resolvers: [], seeds: [], ...p };

  const cache: T.InMemoryCache = new InMemoryCache();
  const data = await processSeeds(opts.seeds);
  if (opts.debug) console.log('NIAMA API (boot) - initial data :', data);
  cache.writeData({ data });

  const clientO = { cache, link: await getLink(opts), resolvers: opts.resolvers, typeDefs: [] };

  const provider: T.Provider = new ApolloClient(clientO) as T.Provider;
  provider.seeds = opts.seeds;
  provider.addSeed = async (seed: T.Actioner) => {
    provider.seeds.push(seed);
    cache.writeData({ data: await seed() });
  };
  provider.onResetStore(async () => cache.writeData({ data: await processSeeds(provider.seeds) }));
  provider.resetStore$ = defer(async () => {
    await provider.resetStore();
  });

  setProvider({ provider, id: 'api', onInit: () => provide(DefaultApolloClient, provider) });
};

const getUri = (type: 'http' | 'ws', secured = false): string => {
  const { NIAMA_API_HOST: HOST, NIAMA_API_PATH: PATH, NIAMA_API_PORT: PORT } = process.env;
  return `${type}${secured ? 's' : ''}://${HOST || 'localhost'}${PORT ? ':' + PORT : ''}${PATH ? '/' + PATH : ''}`;
};

const getLink = async ({ debug, http, prelink, secured, ws, rest }: T.BootApiO): Promise<T.ApolloLink> => {
  if (rest) {
    const { RestLink } = await import('apollo-link-rest');
    const opts: T.RestLinkO = {
      uri: getUri('http', secured),
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
    const opts: T.HttpLinkO = { credentials: 'include', uri: getUri('http', secured), ...(typeof http === 'boolean' ? {} : http) };
    if (debug) console.log('NIAMA API (boot) - HTTP Link :', opts);
    httpLink = new HttpLink(opts);
  }

  if (ws) {
    const { WebSocketLink } = await import('apollo-link-ws');
    wsLink = new WebSocketLink({ options: { reconnect: true }, uri: getUri('ws') });
  }

  const splitter = ({ query }): boolean => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  };

  const link = httpLink && wsLink ? split(splitter, wsLink, httpLink) : httpLink || wsLink || new ApolloLink();
  return prelink ? prelink.concat(link) : link;
};

const processSeeds = async (seeds: T.Actioner[]) =>
  (await Promise.all(seeds.map((seed) => seed()))).reduce((acc: any, data: any) => ({ ...acc, ...data }), {});
