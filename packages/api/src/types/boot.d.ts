import { Observable } from '@niama/core/types';

import { ApolloClient, ApolloLink, CacheO, ClientO, HttpLinkO, RestLinkO, WebSocketLinkO } from './externals';
import { Seed } from './main';

// BOOT ====================================================================================================================================

export interface BootHttpApiP extends BootLinkApiP, GetHttpLinkP {}

export interface BootLinkApiP extends BootLocalApiP {
  prelink?: ApolloLink;
}

export interface BootLocalApiP extends Pick<ClientO, 'resolvers' | 'typeDefs'> {
  cache?: CacheO;
  debug?: boolean;
  seeds?: Seed[];
}

export interface BootRestApiP extends BootLinkApiP, GetRestLinkP {}

export interface BootWsApiP extends BootLinkApiP {
  opts?: WebSocketLinkO;
}

export interface BootApiP extends BootLinkApiP {
  http?: HttpLinkO;
  secured?: boolean;
  ws?: WebSocketLinkO;
}

// PROVIDER ================================================================================================================================

export type Provider = ApolloClient & {
  addSeed: <D extends object>(seed: Seed<D>) => Promise<void>;
  resetStore$: Observable<void>;
  seeds: Seed[];
};

// PROPS ===================================================================================================================================

export interface GetHttpLinkP {
  opts?: HttpLinkO;
  secured?: boolean;
}

export interface GetRestLinkP {
  opts?: RestLinkO;
  secured?: boolean;
}

export interface SetApiProviderP extends BootLinkApiP, Omit<ClientO, 'cache'> {}
