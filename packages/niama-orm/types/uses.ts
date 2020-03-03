import * as Api from '@niama/api/types';
import {
    Asyncer, Loadable, Maybe, Observable, Observabler, Ref, SagaCfg, SagaO, Sourcable, Subject, UseSagaReturnsO
} from '@niama/core/types';

import { Cfg, OpCfg, Rp } from './main';

// OPERATIONS ==============================================================================================================================

export type OpO<C extends Cfg> = { rp: Rp<C> };

// MAIN ====================================================================================================================================

export type UseO = { debug?: boolean };
export type UseR = { error: Ref<Error>; loading: Ref<boolean> };

export interface UseReadO<C extends Cfg, Vo, Dto> extends UseO {
  fallback?: Vo;
  fetchPolicy?: 'cache-and-network' | 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby';
  fields?: C['FiC']['F'];
  update?: (dto: Dto) => Vo;
  validation?: unknown;
}

// READ ONE ================================================================================================================================

export interface UseReadOneO<C extends Cfg, Vo = C['ObC']['Po'], Dto = C['ObC']['Po']> extends UseReadO<C, Vo, Dto> {
  id: string;
}

export interface UseReadOneP<C extends Cfg, Vo, Dto = C['ObC']['Po']> extends OpO<C>, UseReadOneO<C, Vo, Dto> {}
export type UseReadOneTypedP<C extends Cfg, Vo, Dto = C['ObC']['Po']> = UseReadOneO<C, Vo, Dto>;

export interface UseReadOneR<Vo> extends UseR {
  item: Api.R<Maybe<Vo>>;
}

// READ MANY ===============================================================================================================================

export interface UseReadManyO<C extends Cfg, Vo = C['ObC']['Po'], Dto = C['ObC']['Po']> extends UseReadO<C, Vo, Dto> {
  count?: boolean;
  fetchAll?: boolean;
  limit?: Maybe<number>;
  offset?: number;
  orderBy?: C['OpC']['OB']
  total?: boolean;
  where?: C['OpC']['W'];
}
export interface UseReadManyP<C extends Cfg, Vo = C['ObC']['Po'], Dto = C['ObC']['Po']> extends OpO<C>, UseReadManyO<C, Vo, Dto> {}
export type UseReadManyTypedP<C extends Cfg, Vo = C['ObC']['Po'], Dto = C['ObC']['Po']> = UseReadManyO<C, Vo, Dto>;

export interface UseReadManyR<Vo> extends UseR {
  count: Ref<Maybe<number>>;
  items: Api.R<Vo[]>;
  fetchMore: (index: number, done: Function) => Promise<void>;
  refetch: any;
  total: Ref<Maybe<number>>;
}

// COUNT ===================================================================================================================================

export interface UseCountO<C extends Cfg> extends UseO {
  where: Ref<C['OpC']['W']> | C['OpC']['W'];
}

export interface UseCountP<C extends Cfg> extends OpO<C>, Partial<UseCountO<C>> {}
export type UseCountTypedP<C extends Cfg> = Partial<UseCountO<C>>;

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

export type CreateO<C extends Cfg> = { fields?: C['FiC']['F'] };

/*export interface UseCreateP<C extends Cfg, Done, Fail = null> extends OpO<C>, UseCreateO<C, Done, Fail> {}
export interface UseCreateTypedP<C extends Cfg, Done, Fail = null> extends UseCreateO<C, Done, Fail> {}
export type UseCreateR<C extends Cfg, Done, Fail = null> = Observabler<Done | Fail, C['ObC']['Create']>;

export interface UseCreate$P<C extends Cfg, Done, Fail = null> extends UseCreateP<C, Done, Fail> {}
export interface UseCreate$TypedP<C extends Cfg, Done, Fail = null> extends UseCreateTypedP<C, Done, Fail> {}
export type UseCreate$R<C extends Cfg, Done, Fail = null> = Sourcable<Done | Fail, C['ObC']['Create']>;*/

export type CreateC<C extends Cfg, Done = string, Fail = null> = OpCfg<C, C['ObC']['Create'], C['ObC']['Po'], Done, Fail, CreateO<C>>;
export type CreateTypedC<C extends Cfg, Done = string, Fail = null> = SagaCfg<C['ObC']['Create'], C['ObC']['Po'], Done, Fail, CreateO<C>>;

// DELETE ONE ==============================================================================================================================

/*export interface UseDeleteOneO<C extends Cfg, Done, Fail = null> extends UseO, SagaO<Done, string, Fail> {}

export interface UseDeleteOneP<C extends Cfg, Done, Fail = null> extends OpO<C>, UseDeleteOneO<C, Done, Fail> {}
export interface UseDeleteOneTypedP<C extends Cfg, Done, Fail = null> extends UseDeleteOneO<C, Done, Fail> {}
export type UseDeleteOneR<C extends Cfg, Done, Fail = null> = Observabler<Done | Fail, string>;

export interface UseDeleteOne$P<C extends Cfg, Done, Fail = null> extends UseDeleteOneP<C, Done, Fail> {}
export interface UseDeleteOne$TypedP<C extends Cfg, Done, Fail = null> extends UseDeleteOneTypedP<C, Done, Fail> {}
export type UseDeleteOne$R<C extends Cfg, Done, Fail = null> = Sourcable<Done | Fail, string>;*/

export type DeleteOneC<C extends Cfg, Done = string, Fail = null> = OpCfg<C, string, string, Done, Fail>;
export type DeleteOneTypedC<Done = string, Fail = null> = SagaCfg<string, string, Done, Fail>;
