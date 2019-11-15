import { ApolloClient as BaseApolloClient } from 'apollo-client';
import { DollarApollo as BaseDollarApollo } from 'vue-apollo/types/vue-apollo';

export type ApolloClient<T = any> = BaseApolloClient<T>;
export type DollarApollo<T = any> = BaseDollarApollo<T>;

export * from '@niama/api/types';
export { InMemoryCache } from 'apollo-cache-inmemory';
export { Resolvers } from 'apollo-client';
export { ApolloLink } from 'apollo-link';
export { HttpLink } from 'apollo-link-http';
export { WebSocketLink } from 'apollo-link-ws';
export { DocumentNode } from 'graphql';
