import { onBeforeUnmount, ref } from '@vue/composition-api';
import { from, of, Subject, Subscription, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import * as T from '../types';
import { notifyFail } from './ui';

// UTILS ===================================================================================================================================

export const observabler = <R, S>(asyncOrSync?: T.Actioner<R, S>): T.Maybe<T.Observabler<R, S>> =>
  asyncOrSync ? (...s) => from((async () => asyncOrSync(...s))()) : null;

export const subscribeMany = (observables: T.Observable[]) => {
  const subscription: T.Subscription = new Subscription();
  observables.forEach((observable) => subscription.add(observable.subscribe()));
  onBeforeUnmount(() => subscription.unsubscribe());
};

// SAGA ====================================================================================================================================

export const isSagaP = <D, R, S, F>(p: T.Asyncer<R, S> | T.SagaP<D, R, S, F>): p is T.SagaP<D, R, S, F> =>
  'act' in (p as T.SagaP<D, R, S, F>);

export const saga = <D, R = D, S = void, F = null>(p: T.Asyncer<R, S> | T.SagaP<D, R, S, F>): T.Observabler<D | F, S> => {
  const { act, mapError = (e) => e, ...opts }: T.SagaP<D, R, S, F> = isSagaP(p) ? p : { act: p };
  return (...actSrc) =>
    from(act(...actSrc)).pipe(
      switchMap(sagaDone(opts)),
      catchError((err) => sagaFail(opts)(mapError(err)))
    );
};

export const sagaDone = <D, S, F>({ always, done, onAlways, onDone }: T.SagaO<D, S, F> = {}): T.Observabler<D, S> =>
  done || observabler(onDone) || always || observabler(onAlways) || ((s) => of((s as unknown) as D));

export const sagaFail = <D, S, F>({ always, fail, onAlways }: T.SagaO<D, S, F> = {}): T.Observabler<D | F, Error> =>
  fail || always || observabler(onAlways) || ((e) => throwError(e));

// LOADABLE ================================================================================================================================

export const useLoadable = <R, S, SR>(p: T.UseLoadableP<R, S, SR>): T.Loadable<R> => {
  const { autosubscribe = true, next = () => {}, selector = (_s: S, sr: SR) => (sr as unknown) as R, src$, switcher } = p;
  const loading: T.Ref<boolean> = ref(false);
  const res$: T.Observable<R> = src$.pipe(
    tap(() => (loading.value = true)),
    switchMap(switcher, selector),
    tap(() => (loading.value = false))
  );
  if (autosubscribe) {
    const subscription = res$.subscribe({ next });
    onBeforeUnmount(() => subscription.unsubscribe());
  }
  return { loading, res$ };
};

// SOURCABLE ===============================================================================================================================

export const isUseSourcableP = <R, S, SR>(p: T.Observabler<SR, S> | T.UseSourcableP<R, S, SR>): p is T.UseSourcableP<R, S, SR> =>
  'switcher' in (p as T.UseSourcableP<R, S, SR>);

export const useSourcable = <R, S, SR>(p: T.Observabler<SR, S> | T.UseSourcableP<R, S, SR>): T.Sourcable<R, S> => {
  const src$: T.Subject<S> = new Subject();
  return { src$, ...useLoadable({ ...(isUseSourcableP(p) ? p : { switcher: p }), src$ }) };
};

// NOTIFY ==================================================================================================================================

export const notifyFail$ = <F>(p: T.NotifyFail$P<F> | Error): T.Observable<F> => {
  const { error, value = undefined } = isNotifyFail$P(p) ? p : { error: p };
  notifyFail(error);
  return of(value as F);
};
export const isNotifyFail$P = <F>(p: T.NotifyFail$P<F> | Error): p is T.NotifyFail$P<F> => 'error' in (p as T.NotifyFail$P<F>);
