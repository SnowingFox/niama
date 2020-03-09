import { Maybe } from '@niama/core/types';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient as BaseApolloClient, ApolloClientOptions, ApolloQueryResult } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { RestLink } from 'apollo-link-rest';
import { WebSocketLink } from 'apollo-link-ws';

export type ApolloClient<T = unknown> = BaseApolloClient<T>;
export type ClientO = ApolloClientOptions<NormalizedCacheObject>;
export type HttpLinkO = HttpLink.Options;
export type RestLinkO = RestLink.Options;
export type WebSocketLinkO = WebSocketLink.Configuration;
export type QData<T> = Maybe<Record<string, T>>;
export type QR<T = unknown> = ApolloQueryResult<QData<T>>;

export { UseMutationOptions as UseMutationO, UseQueryOptions as UseQueryO, UseResultReturn as R } from '@vue/apollo-composable';
export { InMemoryCache, InMemoryCacheConfig as CacheO, NormalizedCacheObject } from 'apollo-cache-inmemory';
export { Resolvers } from 'apollo-client';
export { ApolloLink } from 'apollo-link';
export { HttpLink } from 'apollo-link-http';
export { WebSocketLink } from 'apollo-link-ws';
export { DocumentNode } from 'graphql';
