import { Actioner, Dict, Maybe, Observable } from '@niama/core/types';
import { ApolloQueryResult } from 'apollo-client';
import { RestLink } from 'apollo-link-rest';

import { ApolloLink, HttpLink } from '../src/types';
import { ApolloClient, DocumentNode, Resolvers } from './externals';

// NAMING ==================================================================================================================================

export type Names = NamesId | NamesType;
export type NamesId = 'id';
export type NamesType = '__typename';

// OBJECTS =================================================================================================================================

export interface RP<Labels = Dict<string>, Ops = Record<string, DocumentNode>> {
  labels: Labels;
  ops: Ops;
}

export interface Vo {
  id: string;
}

export interface Dto extends Vo {
  __typename: string;
}

export type F = string[] | ({ _?: string[] } & Record<string, any>);

export interface OpAlias {
  id: string;
  args?: string[];
}

export interface OpO {
  alias?: OpAlias;
  fields?: F;
  local?: boolean;
  rest?: OpRest;
  selector: string;
  varTypes?: Dict;
}

export interface OpRest {
  bodyKey?: string;
  method: OpRestType;
  path: string;
  type: string;
}

export type OpRestType = 'DELETE' | 'GET' | 'POST' | 'PUT';

export type OpType = 'mutation' | 'query' | 'subscription';

// PARAMS ==================================================================================================================================

export interface AddDefaultFieldsP<Fi extends F> {
  defaults: Fi;
  fields: Fi;
}

export interface GetOpP extends GetTypedOpP {
  type: OpType;
}

export interface GetTypedOpP extends OpO {
  name?: string;
}

// BOOT ====================================================================================================================================

export type HttpLinkO = HttpLink.Options;
export type RestLinkO = RestLink.Options;

export interface BootO {
  debug: boolean;
  http: boolean | HttpLinkO;
  prelink?: ApolloLink;
  resolvers: Resolvers | Resolvers[];
  rest: boolean | RestLinkO;
  secured: boolean;
  seeds: Actioner[];
  ws: boolean;
}

export interface BootP extends Partial<BootO> {}

// PROVIDER ================================================================================================================================

export type Provider = ApolloClient & {
  addSeed: (seed: Actioner) => Promise<void>;
  resetStore$: Observable<Maybe<QR[]>>;
  seeds: Actioner[];
};

// REQUESTS ================================================================================================================================

export type QData<T> = Maybe<Record<string, T>>;
export type QR<T = unknown> = ApolloQueryResult<QData<T>>;
