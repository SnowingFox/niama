import { ApolloClient as BaseApolloClient } from 'apollo-client';

export type ApolloClient<T = unknown> = BaseApolloClient<T>;

export * from '@niama/api/types';
export { UseMutationOptions as UseMutationO, UseQueryOptions as UseQueryO } from '@vue/apollo-composable';
export { InMemoryCache } from 'apollo-cache-inmemory';
export { Resolvers } from 'apollo-client';
export { ApolloLink } from 'apollo-link';
export { HttpLink } from 'apollo-link-http';
export { WebSocketLink } from 'apollo-link-ws';
export { DocumentNode } from 'graphql';
