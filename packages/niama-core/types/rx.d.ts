import { Niama } from './';
import { Observable, Ref, Subject } from './externals';
import { Actioner, Asyncer } from './main';
import { NotifyFailP } from './ui';

// UTILS ===================================================================================================================================

export type Observabler<Res = unknown, Src = unknown> = (s: Src) => Observable<Res>;

// SAGA ====================================================================================================================================

export interface SagaO<Done, Src, Fail = null> {
  always$?: Observabler<Done, Src | Error>;
  done$?: Observabler<Done, Src>;
  fail$?: Observabler<Fail, Error>;
  onAlways?: Actioner<Done, Src | Error>;
  onDone?: Actioner<Done, Src>;
}

export interface Saga$P<Done, Src, Fail = null> extends SagaO<Done, Src, Fail> {
  mapError?: (e: Error) => Error;
  saga: Asyncer<Src>;
}

export interface UseSagaReturnsO {
  notify?: boolean;
  notifyOnDone?: boolean;
  notifyOnFail?: boolean;
}

export interface UseSagaReturnsP<Done, Src, Fail> extends UseSagaReturnsO, SagaO<Done, Src, Fail> {
  notifyId?: string;
}

export interface UseSagaReturnsR<Done, Src, Fail> {
  $niama: Niama;
  done$: Observabler<Done, Src>;
  fail$: Observabler<Done | Fail, Error>;
}

// LOADABLE ================================================================================================================================

export interface Loadable<Res = unknown> {
  res$: Observable<Res>;
  loading: Ref<boolean>;
}

export interface UseLoadableP<Res = unknown, Src = unknown, SwitcherRes = Res> extends UseSourcableP<Res, Src, SwitcherRes> {
  src$: Observable<Src>;
}

// SOURCABLE ===============================================================================================================================

export interface Sourcable<Res = unknown, Src = unknown> extends Loadable<Res> {
  src$: Subject<Src>;
}

export interface UseSourcableP<Res = unknown, Src = unknown, SwitcherRes = Res> {
  autosubscribe?: boolean;
  debug?: boolean;
  next?: (result: Res) => void;
  selector?: (source: Src, result: SwitcherRes) => Res;
  switcher: Observabler<SwitcherRes, Src>;
}

// NOTIFY FAIL =============================================================================================================================

export interface NotifyFail$P<F> extends NotifyFailP {
  value?: F;
}
