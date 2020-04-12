import { Niama } from './';
import { GetBootCfg, GetRawCfg } from './boot';
import { Observable, RawLocation, Ref, Subject } from './externals';
import { Actioner, Asyncer, Syncer } from './main';

// UTILS ===================================================================================================================================

export type Observabler<Res = void, Src = void> = (...s: [Src]) => Observable<Res>;

// SAGA ====================================================================================================================================

export interface SagaCfg<Src = any, Res = any, Done = Res, Fail = any, Extra = {}> {
  P: SagaO<Done, Res, Fail> & Extra;
  R: Observabler<Done | Fail, Src>;
  UseP: UseSagaReturnsO<Done> & SagaO<Done, Res, Fail> & Extra;
  L$P: { src$: Observable<Src> } & UseSagaReturnsO<Done> & SagaO<Done, Res, Fail> & Extra;
  L$R: Loadable<Done | Fail>;
  S$R: Sourcable<Done | Fail, Src>;
}

export interface SagaO<Done, Src, Fail = null> {
  always?: Observabler<Done, Src | Error>;
  done?: Observabler<Done, Src>;
  fail?: Observabler<Done | Fail, Error>;
  onAlways?: Actioner<Done, Src | Error>;
  onDone?: Actioner<Done, Src>;
}

export interface SagaP<Done, Res, Src, Fail = null> extends SagaO<Done, Res, Fail> {
  act: Asyncer<Res, Src>;
  mapError?: (e: Error) => Error;
}

export interface UseSagaDoneP<Done, Src, Fail = null> {
  $niama: Niama;
  notifyId?: string;
  opts: SagaO<Done, Src, Fail>;
  redirect?: RawLocation | Syncer<RawLocation, Done>;
}

export interface UseSagaFailP<Done, Src, Fail = null> {
  $niama: Niama;
  notify: boolean;
  opts: SagaO<Done, Src, Fail>;
  redirect?: RawLocation | Syncer<RawLocation, Error>;
}

export interface UseSagaReturnsO<Done> {
  notify?: boolean;
  notifyOnDone?: boolean;
  notifyOnFail?: boolean;
  redirect?: RawLocation | Syncer<RawLocation, Done | Error>;
  redirectOnDone?: RawLocation | Syncer<RawLocation, Done>;
  redirectOnFail?: RawLocation | Syncer<RawLocation, Error>;
}

export interface UseSagaReturnsP<Done, Src, Fail = null> extends UseSagaReturnsO<Done>, SagaO<Done, Src, Fail> {
  notifyId?: string;
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

export interface UseLoadableP<Res = any, Src = any, SwitcherRes = Res> extends UseSourcableP<Res, Src, SwitcherRes> {
  src$: Observable<Src>;
}

// SOURCABLE ===============================================================================================================================

export interface Sourcable<Res = any, Src = any> extends Loadable<Res> {
  src$: Subject<Src>;
}

export interface UseSourcableP<Res = any, Src = any, SwitcherRes = Res> {
  autosubscribe?: boolean;
  debug?: boolean;
  next?: (result: Res) => void;
  selector?: (source: Src, result: SwitcherRes) => Res;
  switcher: Observabler<SwitcherRes, Src>;
}

// NOTIFY FAIL =============================================================================================================================

export interface NotifyFail$P<F> {
  error: Error;
  value?: F;
}
