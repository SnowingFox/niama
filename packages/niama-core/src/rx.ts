import { onBeforeUnmount, ref } from '@vue/composition-api';
import { defer, of, Subject, Subscription, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import * as T from '../types';
import { notifyError } from './ui';

export function rxFrom<R, S>(asyncOrSync?: (s: S) => R | Promise<R>): T.Maybe<T.Observabler<R, S>> {
  return asyncOrSync ? (s: S) => defer(async () => await asyncOrSync(s)) : null;
}

export function getLoadable<R, S>({ autosubscribe = true, source$, switcher }: T.GetLoadableP<R, S>): T.Loadable<R> {
  const loading: T.Ref<boolean> = ref(false);
  const result$: T.Observable = source$.pipe(
    tap(() => (loading.value = true)),
    switchMap(switcher),
    tap(() => (loading.value = false))
  );
  if (autosubscribe) {
    const subscription = result$.subscribe();
    onBeforeUnmount(() => subscription.unsubscribe());
  }
  return { loading, result$ };
}

export function notifyError$({ $niama, error, messageId, prefix }: T.NotifyErrorP): T.Observable<null> {
  if (process.env.DEV) console.error(error);
  notifyError({ $niama, messageId: messageId ? messageId : prefix ? `${prefix}.${error.name}` : error.message });
  return of(null);
}

export function requestError$<R, S>({ complete$, error$, onComplete }: T.RequestO<R, S>): T.Observabler<R, Error> {
  return error$ || complete$ || rxFrom(onComplete) || ((e) => throwError(e));
}

export function requestSuccess$<R, S>({ complete$, onComplete, onSuccess, success$ }: T.RequestO<R, S>): T.Observabler<R, S> {
  return success$ || rxFrom(onSuccess) || complete$ || rxFrom(onComplete) || ((s) => of(s as any));
}

export function request$<R, S>(p: T.Promiser<S> | T.RequestP<R, S>): T.Observable<R> {
  const { request, ...opts }: T.RequestP<R, S> = isRequestP(p) ? p : { request: p };
  return defer(request).pipe(
    switchMap(requestSuccess$(opts)),
    catchError(requestError$(opts))
  );
}
export function isRequestP<R, S>(p: T.Promiser<S> | T.RequestP<R, S>): p is T.RequestP<R, S> {
  return (p as T.RequestP<R, S>).request !== undefined;
}

export function getSourcable<R, S>(p: T.Observabler<R, S> | T.GetSourcableP<R, S>): T.Sourcable<R, S> {
  const source$: T.Subject<S> = new Subject();
  return { source$, ...getLoadable({ ...(isGetSourcableP(p) ? p : { switcher: p }), source$ }) };
}
export function isGetSourcableP<R, S>(p: T.Observabler<R, S> | T.GetSourcableP<R, S>): p is T.GetSourcableP<R, S> {
  return (p as T.GetSourcableP<R, S>).switcher !== undefined;
}

export const subscribeMany = (observables: T.Observable[]) => {
  const subscription: T.Subscription = new Subscription();
  observables.forEach((observable) => subscription.add(observable.subscribe()));
  onBeforeUnmount(() => subscription.unsubscribe());
};
