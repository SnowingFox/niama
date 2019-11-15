import { Dict, Maybe, Observable } from '@niama/core/types';
import { ApolloQueryResult } from 'apollo-client';
import { RestLink } from 'apollo-link-rest';

import { DocumentNode, DollarApollo, Resolvers } from './externals';

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

export type F = string[] | { _?: string[] } & Record<string, any>;

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

export interface BootO<D = any> {
  http: boolean;
  initial: () => D;
  resolvers: Resolvers | Resolvers[];
  rest: boolean | RestLink.Options;
  secured: boolean;
  ws: boolean;
}

export interface BootP<D = any> extends Partial<BootO<D>> {
  app: any;
  Vue: any;
}

// PROVIDER ================================================================================================================================

export type Provider = DollarApollo & { resetStore: () => Promise<Maybe<QR[]>>; resetStore$: Observable<Maybe<QR[]>> };

// REQUESTS ================================================================================================================================

export type QData<T> = Maybe<Record<string, T>>;
export type QR<T = any> = ApolloQueryResult<QData<T>>;
