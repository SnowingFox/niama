import { onBeforeUnmount, ref } from '@vue/composition-api';
import { defer, of, Subject, Subscription, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import * as T from '../types';
import { notifyFail } from './ui';

// UTILS ===================================================================================================================================

export function observabler<R, S>(asyncOrSync?: (s: S) => R | Promise<R>): T.Maybe<T.Observabler<R, S>> {
  return asyncOrSync ? (s: S) => defer(async () => await asyncOrSync(s)) : null;
}

export const subscribeMany = (observables: T.Observable[]) => {
  const subscription: T.Subscription = new Subscription();
  observables.forEach((observable) => subscription.add(observable.subscribe()));
  onBeforeUnmount(() => subscription.unsubscribe());
};

// SAGA ====================================================================================================================================

export function isSaga$P<D, S, F>(p: T.Asyncer<S> | T.Saga$P<D, S, F>): p is T.Saga$P<D, S, F> {
  return (p as T.Saga$P<D, S, F>).saga !== undefined;
}

export function saga$<D, S, F>(p: T.Asyncer<S> | T.Saga$P<D, S, F>): T.Observable<D | F> {
  const { saga, mapError = (e) => e, ...opts }: T.Saga$P<D, S, F> = isSaga$P(p) ? p : { saga: p };
  return defer(saga).pipe(
    switchMap(sagaDone$(opts)),
    catchError((err) => sagaFail$(opts)(mapError(err)))
  );
}

export function sagaDone$<D, S, F>({ always$, done$, onAlways, onDone }: T.SagaO<D, S, F> = {}): T.Observabler<D, S> {
  return done$ || observabler(onDone) || always$ || observabler(onAlways) || ((s) => of((s as unknown) as D));
}

export function sagaFail$<D, S, F>({ always$, fail$, onAlways }: T.SagaO<D, S, F> = {}): T.Observabler<D | F, Error> {
  return fail$ || always$ || observabler(onAlways) || ((e) => throwError(e));
}

// LOADABLE ================================================================================================================================

export function useLoadable<R, S, SR>(p: T.UseLoadableP<R, S, SR>): T.Loadable<R> {
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
}

// SOURCABLE ===============================================================================================================================

export function isUseSourcableP<R, S, SR>(p: T.Observabler<SR, S> | T.UseSourcableP<R, S, SR>): p is T.UseSourcableP<R, S, SR> {
  return (p as T.UseSourcableP<R, S, SR>).switcher !== undefined;
}

export function useSourcable<R, S, SR>(p: T.Observabler<SR, S> | T.UseSourcableP<R, S, SR>): T.Sourcable<R, S> {
  const src$: T.Subject<S> = new Subject();
  return { src$, ...useLoadable({ ...(isUseSourcableP(p) ? p : { switcher: p }), src$ }) };
}

// NOTIFY ==================================================================================================================================

export function notifyFail$<F>(p: T.NotifyFail$P<F> | Error): T.Observable<F> {
  const { value = undefined, ...rest } = isNotifyFail$P(p) ? p : { error: p };
  notifyFail(rest);
  return of(value as F);
}
export function isNotifyFail$P<F>(p: T.NotifyFail$P<F> | Error): p is T.NotifyFail$P<F> {
  return (p as T.NotifyFail$P<F>).error !== undefined;
}
