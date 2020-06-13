/**
 * @packageDocumentation
 * @module @niama/core
 */

import { onBeforeUnmount, ref } from '@vue/composition-api';
import { from, of, Subject, Subscription, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import * as T from './typings';
import { notifyFail } from './ui';

// UTILS ===================================================================================================================================

/**
 * Get an observabler from an actioner(sync or async function).
 * @param actioner
 * @returns an observabler or null if actioner was undefined.
 */
export const observabler = <R, S>(actioner?: T.Actioner<R, S>): T.Maybe<T.Observabler<R, S>> =>
  actioner ? (...s) => from((async () => actioner(...s))()) : null;
/**
 * Create a subscription, register observables and unsubscribe automatically before unmount.
 * @param observables an array of observables to subscribe to.
 */
export const subscribeMany = (observables: T.Observable[]) => {
  const subscription: T.Subscription = new Subscription();
  observables.forEach((observable) => subscription.add(observable.subscribe()));
  onBeforeUnmount(() => subscription.unsubscribe());
};

// SAGA ====================================================================================================================================

/**
 *
 * @param act
 * @param opts
 */
export const saga = <D, R = D, S = void, F = null>(act: T.Actioner<R, S>, opts: T.SagaO<D, R, F> = {}): T.Observabler<D | F, S> => {
  const { mapError = (e) => e } = opts;
  return (...actSrc) =>
    from((async () => act(...actSrc))()).pipe(
      switchMap(sagaDone(opts)),
      catchError((err) => sagaFail(opts)(mapError(err)))
    );
};

/**
 *
 * @param opts
 */
export const sagaDone = <D, S, F>(opts: T.SagaO<D, S, F> = {}): T.Observabler<D, S> => {
  const { always, done, onAlways, onDone } = opts;
  return done || observabler(onDone) || always || observabler(onAlways) || ((s) => of((s as unknown) as D));
};

/**
 *
 * @param opts
 */
export const sagaFail = <D, S, F>(opts: T.SagaO<D, S, F> = {}): T.Observabler<D | F, Error> => {
  const { always, fail, onAlways, onFail } = opts;
  return fail || observabler(onFail) || always || observabler(onAlways) || ((e) => throwError(e));
};

// LOADABLE ================================================================================================================================

/**
 *
 * @param src$
 * @param switcher
 * @param opts
 */
export const useLoadable = <R, S, SR>(
  src$: T.Observable<S>,
  switcher: T.Observabler<SR, S>,
  opts: T.SourcableO<R, S, SR> = {}
): T.Loadable<R> => {
  const { autosubscribe = true, next = () => {}, selector = (_s: S, sr: SR) => (sr as unknown) as R } = opts;
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

/**
 *
 * @param switcher
 * @param opts
 */
export const useSourcable = <R, S, SR>(switcher: T.Observabler<SR, S>, opts: T.SourcableO<R, S, SR> = {}): T.Sourcable<R, S> => {
  const src$: T.Subject<S> = new Subject();
  return { src$, ...useLoadable(src$, switcher, opts) };
};

// NOTIFY ==================================================================================================================================

/**
 *
 * @param error
 * @param value
 */
export const notifyFail$ = <F>(error: Error, value?: F): T.Observable<F> => {
  notifyFail(error);
  return of(value as F);
};
