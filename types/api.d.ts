import * as C from './core';
import * as E from './externals';

// FRONT CONFIG ============================================================================================================================

export interface ApiConfig<F extends ApiF, L, R> {
  fields: F;
  labels: L;
  requests: R;
}

// OBJECTS =================================================================================================================================

export interface ApiE {
  id: string;
}

export interface ApiR extends ApiE {
  __typename: string;
}

// FIELDS ==================================================================================================================================

export type ApiF = string[] | { _: string[]; [id: string]: ApiF };
export type ApiIdFNames = 'id';
export type ApiTypeFNames = '__typename';
export type ApiRFNames = ApiIdFNames | ApiTypeFNames;

// REQUESTS ================================================================================================================================

export type ApiQData<T> = C.Maybe<Record<string, T>>;
export type ApiQR<T> = E.ApolloQueryResult<ApiQData<T>>;

export interface ApiRequestO<F extends ApiF> {
  connection?: string;
  fields?: F;
  remote?: boolean;
  selector: string;
  varTypes?: C.Dict;
}

export type ApiRequestType = 'mutation' | 'query' | 'subscription';

// PRISMA ==================================================================================================================================

export type ApiPrisma<E = any, S = any> = { $exists: E; $subscribe: S };

// BOOT ====================================================================================================================================

export interface ApiBootO<D = any> {
  http?: boolean;
  initial?: () => D;
  resolvers?: E.Resolvers | E.Resolvers[];
  rest?: boolean;
  secured?: boolean;
  ws?: boolean;
}
