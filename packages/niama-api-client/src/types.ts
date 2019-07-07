import { Dict, Maybe } from '@niama/core';
import { ApolloQueryResult, Resolvers } from 'apollo-client';

// FIELDS ==================================================================================================================================

export type ApiF = string[] | { _: string[]; [id: string]: ApiF };
export type ApiIdFNames = 'id';
export type ApiTypeFNames = '__typename';
export type ApiRFNames = ApiIdFNames | ApiTypeFNames;

// REQUESTS ================================================================================================================================

export type ApiQData<T> = Maybe<Record<string, T>>;
export type ApiQR<T> = ApolloQueryResult<ApiQData<T>>;

export interface ApiRequestO<F extends ApiF> {
  connection?: string;
  fields?: F;
  remote?: boolean;
  selector: string;
  varTypes?: Dict;
}

export type ApiRequestType = 'mutation' | 'query' | 'subscription';

// BOOT ====================================================================================================================================

export interface ApiBootO<D = any> {
  http?: boolean;
  initial?: () => D;
  resolvers?: Resolvers | Resolvers[];
  rest?: boolean;
  secured?: boolean;
  ws?: boolean;
}