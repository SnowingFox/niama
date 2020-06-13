/**
 * @packageDocumentation
 * @module @niama/core
 */

import { ref } from '@vue/composition-api';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { isFunction } from './lodash';
import { useNiama } from './provider';
import { notifyFail$, observabler, saga, sagaDone, sagaFail } from './rx';
import * as T from './typings';
import { notifyDone } from './ui';
import { coreError } from './utils';

/**
 *
 * @param initial
 */
export const useInput = <Input>(initial: Input): T.UseInputR<Input> => {
  const input = ref({ ...initial }) as T.Ref<Input>;
  return { initial, input, reset: () => (input.value = { ...initial }) };
};

export const useSaga = <D, R = D, S = void, F = null>(
  act: T.Asyncer<R, S>,
  opts: T.SagaReturnsO<D, R, F> = {}
): T.Observabler<D | F, S> => {
  const { done, fail } = useSagaReturns(opts);
  return saga(act, { done, fail });
};

/**
 *
 * @param opts
 */
export const useSagaReturns = <D, S, F>(opts: T.SagaReturnsO<D, S, F> = {}): T.UseSagaReturnsR<D, S, F> => {
  const $niama = useNiama();
  return { $niama, done: useSagaDone($niama, opts), fail: useSagaFail($niama, opts) };
};

const useSagaDone = <D, S, F>({ router }: T.Niama, opts: T.SagaReturnsO<D, S, F>): T.Observabler<D, S> => (s: S) => {
  const { notifyId, notify = false, notifyOnDone = false } = opts;
  if ((notify || notifyOnDone) && !notifyId) throw coreError('useSagaReturns.UndefinedNotifyId');
  const redirect = opts.redirectOnDone ?? opts.redirect;
  return sagaDone(opts)(s).pipe(
    tap(() => (notifyOnDone || notify) && notifyId && notifyDone(notifyId)),
    switchMap((done) => (redirect ? router.replace(isFunction(redirect) ? redirect(done) : redirect).then(() => done) : of(done)))
  );
};

const useSagaFail = <D, S, F>({ router }: T.Niama, opts: T.SagaReturnsO<D, S, F>): T.Observabler<D | F, Error> => {
  const { notify = false, notifyOnFail = false } = opts;
  const redirect = opts.redirectOnFail ?? opts.redirect;
  if (notify || notifyOnFail) return notifyFail$;
  if (!redirect) return sagaFail(opts);
  return observabler<F, Error>(async (e) => {
    await router.replace(isFunction(redirect) ? redirect(e) : redirect);
    return (null as unknown) as F;
  })!;
};
