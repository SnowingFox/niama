import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import VueApollo from 'vue-apollo';

import { ApiBootO } from './types';

export function apiBootS<D = any>(options: ApiBootO<D> = {}) {
  return async ({ app, Vue }) => {
    const defO: Required<ApiBootO<D>> = { initial: () => ({} as D), http: false, rest: false, resolvers: [], secured: false, ws: false };
    const o: Required<ApiBootO<D>> = { ...defO, ...options };

    const cache: InMemoryCache = new InMemoryCache();
    cache.writeData({ data: o.initial() });

    const defaultClient: ApolloClient<any> = new ApolloClient({ cache, link: await getLink(o), resolvers: o.resolvers });
    defaultClient.onResetStore(async () => await cache.writeData({ data: o.initial() }));

    Vue.use(VueApollo);
    app.apolloProvider = new VueApollo({ defaultClient });
  };
}

function getUri(type: 'http' | 'ws', secured: boolean = false): string {
  const { NIAMA_API_HOST: HOST, NIAMA_API_PATH: PATH, NIAMA_API_PORT: PORT } = process.env;
  return `${type}${secured ? 's' : ''}://${HOST || 'localhost'}${PORT ? ':' + PORT : ''}${PATH ? '/' + PATH : ''}`;
}

async function getLink({ http, secured, ws, rest }: Required<ApiBootO>): Promise<ApolloLink> {
  let httpLink!: HttpLink;
  let wsLink!: WebSocketLink;

  if (rest) {
    const { RestLink } = await import('apollo-link-rest');
    return new RestLink({
      uri: getUri('http', secured),
      responseTransformer: async (r) => (r.url.endsWith('_limit=0') ? +r.headers.get('x-total-count') : await r.json()),
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
