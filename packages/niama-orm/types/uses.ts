import { Loadable, Maybe, Observable, Ref, SagaO, Subject } from '@niama/core/types';

import { Config, RP } from './main';

// OPERATIONS ==============================================================================================================================

export interface OpO<C extends Config> {
  rp: RP<C>;
}

// MAIN ====================================================================================================================================

export interface UseO {
  debug?: boolean;
}

export interface UseR {
  loading: Ref<boolean>;
}

export interface UseReadO<C extends Config, Vo, Dto extends object = C['Dto']> extends UseO {
  fetchPolicy?: 'cache-and-network' | 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby';
  fields?: C['Fields'];
  update?: (dto: Dto) => Vo;
  validation?: unknown;
}

// ONE =====================================================================================================================================

export interface UseOneO<C extends Config, Vo, Dto extends object = C['Dto']> extends UseReadO<C, Vo, Dto> {
  fallback?: Vo;
  id: string;
}

export interface UseOneP<C extends Config, Vo, Dto extends object = C['Dto']> extends OpO<C>, UseOneO<C, Vo, Dto> {}
export type UseOneTypedP<C extends Config, Vo, Dto extends object = C['Dto']> = UseOneO<C, Vo, Dto>;

export interface UseOneR<Vo> extends UseR {
  item: Ref<Vo>;
}

// MANY ====================================================================================================================================

export interface UseManyO<C extends Config, Vo, Dto extends object = C['Dto']> extends UseReadO<C, Vo, Dto> {
  count?: boolean;
  fetchAll?: boolean;
  first?: Maybe<number>;
  skip?: number;
  total?: boolean;
  where?: C['Where'];
}
export interface UseManyP<C extends Config, Vo, Dto extends object = C['Dto']> extends OpO<C>, UseManyO<C, Vo, Dto> {}
export type UseManyTypedP<C extends Config, Vo, Dto extends object = C['Dto']> = UseManyO<C, Vo, Dto>;

export interface UseManyR<Vo> extends UseR {
  count: Ref<Maybe<number>>;
  items: Ref<Maybe<Vo[]>>;
  fetchMore: (_index: number, done: Function) => Promise<void>;
  total: Ref<Maybe<number>>;
}

// COUNT ===================================================================================================================================

export interface UseCountO<C extends Config> extends UseO {
  where: Ref<C['Where']> | C['Where'];
}

export interface UseCountP<C extends Config> extends OpO<C>, Partial<UseCountO<C>> {}
export type UseCountTypedP<C extends Config> = Partial<UseCountO<C>>;

export interface UseCountR extends UseR {
  count: Ref<Maybe<number>>;
}

// BASE ====================================================================================================================================

export interface UseRequestP<Res = unknown, Src = unknown> extends SagaO<Res, Src> {
  src$?: Observable<Src>;
}

export interface UseRequestR<Res = unknown, Src = unknown> extends Loadable<Res> {
  src$?: Subject<Src>;
}

// CREATE ==================================================================================================================================

export interface UseCreateO<Dto = unknown> extends UseO {
  getData: () => Dto;
}

export interface UseCreateP<C extends Config, Dto = unknown, R = unknown, S = unknown> extends OpO<C>, UseRequestP<R, S>, UseCreateO<Dto> {}
export interface UseCreateTypedP<Dto = unknown, Res = unknown, Src = unknown> extends UseRequestP<Res, Src>, UseCreateO<Dto> {}

export type UseCreateR<Res = unknown, Src = unknown> = UseRequestR<Res, Src>;

// DELETE ONE ==============================================================================================================================

export interface UseDeleteOneO extends UseO {
  id: string;
}

export interface UseDeleteOneP<C extends Config, Res = unknown, Src = unknown> extends OpO<C>, UseRequestP<Res, Src>, UseDeleteOneO {}
export interface UseDeleteOneTypedP<Res = unknown, Src = unknown> extends UseRequestP<Res, Src>, UseDeleteOneO {}

export type UseDeleteOneR<Res = unknown, Src = unknown> = UseRequestR<Res, Src>;
