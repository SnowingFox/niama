import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import VueApollo from 'vue-apollo';

import * as T from './types';

function getUri(type: 'http' | 'ws', secured = false): string {
  const { NIAMA_API_HOST: HOST, NIAMA_API_PATH: PATH, NIAMA_API_PORT: PORT } = process.env;
  return `${type}${secured ? 's' : ''}://${HOST || 'localhost'}${PORT ? ':' + PORT : ''}${PATH ? '/' + PATH : ''}`;
}

async function getLink<D>({ http, secured, ws, rest }: T.BootO<D>): Promise<T.ApolloLink> {
  let httpLink!: T.HttpLink;
  let wsLink!: T.WebSocketLink;

  if (rest) {
    const { RestLink } = await import('apollo-link-rest');
    return new RestLink({
      uri: getUri('http', secured),
      responseTransformer: async (r) => (r.url.endsWith('_limit=0') ? +r.headers.get('x-total-count') : await r.json()),
      ...(typeof rest === 'boolean' ? {} : rest),
    });
  }

  if (http) {
    const { HttpLink } = await import('apollo-link-http');
    httpLink = new HttpLink({ credentials: 'include', uri: getUri('http', secured) });
  }

  if (ws) {
    const { WebSocketLink } = await import('apollo-link-ws');
    wsLink = new WebSocketLink({ options: { reconnect: true }, uri: getUri('ws') });
  }

  const splitter = ({ query }): boolean => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  };

  return httpLink && wsLink ? split(splitter, wsLink, httpLink) : httpLink || wsLink || new ApolloLink();
}

export async function bootApi<D = any>({ Vue, app, ...rest }: T.BootP<D>) {
  const opts: T.BootO<D> = { initial: () => ({} as D), http: false, rest: false, resolvers: [], secured: false, ws: false, ...rest };

  const cache: T.InMemoryCache = new InMemoryCache();
  cache.writeData({ data: await opts.initial() });

  const defaultClient: T.ApolloClient = new ApolloClient({ cache, link: await getLink(opts), resolvers: opts.resolvers, typeDefs: [] });
  defaultClient.onResetStore(async () => await cache.writeData({ data: await opts.initial() }));

  Vue.use(VueApollo);
  app.apolloProvider = new VueApollo({ defaultClient });
}
