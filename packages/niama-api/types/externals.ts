import { Maybe } from '@niama/core/types';
import { ApolloClient as BaseApolloClient, ApolloQueryResult } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { RestLink } from 'apollo-link-rest';

export type ApolloClient<T = unknown> = BaseApolloClient<T>;
export type HttpLinkO = HttpLink.Options;
export type RestLinkO = RestLink.Options;
export type QData<T> = Maybe<Record<string, T>>;
export type QR<T = unknown> = ApolloQueryResult<QData<T>>;

export { UseMutationOptions as UseMutationO, UseQueryOptions as UseQueryO, UseResultReturn as R } from '@vue/apollo-composable';
export { InMemoryCache } from 'apollo-cache-inmemory';
export { Resolvers } from 'apollo-client';
export { ApolloLink } from 'apollo-link';
export { HttpLink } from 'apollo-link-http';
export { WebSocketLink } from 'apollo-link-ws';
export { DocumentNode } from 'graphql';
