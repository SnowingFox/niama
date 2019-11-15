import { Loadable, Maybe, Observable, Ref, RequestO, Subject } from '@niama/core/types';

import { Config, RP } from './main';

// OPERATIONS ==============================================================================================================================

export interface OpO<C extends Config> {
  rp: RP<C>;
}

// MAIN ====================================================================================================================================

export interface UseO {
  debug?: boolean;
  manual?: boolean;
}

export interface UseR {
  loading: Ref<boolean>;
}

export interface UseReadO<C extends Config, Vo, Dto extends object = C['Dto']> extends UseO {
  fields?: C['Fields'];
  update?: (dto: Dto) => Vo;
  validation?: any;
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

export interface UseRequestR<Result = any, Source = any> extends Loadable<Result> {
  source$?: Subject<Source>;
}

export interface UseRequestP<Result = any, Source = any> extends RequestO<Result, Source> {
  source$?: Observable<Source>;
}

// DELETE ONE ==============================================================================================================================

export interface UseDeleteOneO extends UseO {
  id: string;
}

export interface UseDeleteOneP<C extends Config, Result = any, Source = any> extends OpO<C>, UseRequestP<Result, Source>, UseDeleteOneO {}
export interface UseDeleteOneTypedP<Result = any, Source = any> extends UseRequestP<Result, Source>, UseDeleteOneO {}

export type UseDeleteOneR<Result = any, Source = any> = UseRequestR<Result, Source>;
