/**
 * @packageDocumentation
 * @module @niama/core/types
 */

// UTILS ===================================================================================================================================

import { Niama } from '@niama/core/types';

import { Observable, RawLocation, Ref, Subject } from './externals';
import { Actioner, Asyncer, Syncer } from './main';

export type Observabler<Res = void, Src = void> = (...s: [Src]) => Observable<Res>;

// SAGA ====================================================================================================================================

export type Saga = <D, Res = D, Src = void, F = null>(act: Asyncer<Res, Src>, opts?: SagaO<D, Res, F>) => Observabler<D | F, Src>;

export interface SagaO<Done, Src, Fail = null> {
  always?: Observabler<Done, Src | Error>;
  done?: Observabler<Done, Src>;
  fail?: Observabler<Done | Fail, Error>;
  mapError?: Syncer<Error, Error>;
  onAlways?: Actioner<Done, Src | Error>;
  onDone?: Actioner<Done, Src>;
  onFail?: Actioner<Done | Fail, Error>
}

export interface SagaReturnsO<Done, Src, Fail = null> extends SagaO<Done, Src, Fail> {
  notify?: boolean;
  notifyId?: string;
  notifyOnDone?: boolean;
  notifyOnFail?: boolean;
  redirect?: RawLocation | Syncer<RawLocation, Done | Error>;
  redirectOnDone?: RawLocation | Syncer<RawLocation, Done>;
  redirectOnFail?: RawLocation | Syncer<RawLocation, Error>;
}

export interface UseSagaReturnsR<Done, Src, Fail = null> {
  $niama: Niama;
  done: Observabler<Done, Src>;
  fail: Observabler<Done | Fail, Error>;
}

// LOADABLE ================================================================================================================================

export interface Loadable<Res = any> {
  res$: Observable<Res>;
  loading: Ref<boolean>;
}

// SOURCABLE ===============================================================================================================================

export interface Sourcable<Res = any, Src = any> extends Loadable<Res> {
  src$: Subject<Src>;
}

export interface SourcableO<Res = any, Src = any, SwitcherRes = Res> {
  autosubscribe?: boolean;
  debug?: boolean;
  next?: (result: Res) => void;
  selector?: (source: Src, result: SwitcherRes) => Res;
}
