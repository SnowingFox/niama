import { ref } from '@vue/composition-api';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { isFunction } from './lodash';
import { useNiama } from './provider';
import { notifyFail$, observabler, sagaDone, sagaFail } from './rx';
import * as T from './typings';
import { notifyDone } from './ui';
import { getError } from './utils';

export const useInput = <Input>(initial: Input): T.UseInputR<Input> => {
  const input: T.Ref<Input> = ref({ ...initial });
  return { initial, input, reset: () => (input.value = { ...initial }) };
};

export const useSagaReturns = <D, S, F>(p: T.UseSagaReturnsP<D, S, F> = {}): T.UseSagaReturnsR<D, S, F> => {
  const { notifyId, notify = false, notifyOnDone = false, notifyOnFail = false, redirect, redirectOnDone, redirectOnFail, ...opts } = p;
  const $niama = useNiama();
  if ((notify || notifyOnDone) && !notifyId) throw getError('useSagaReturns.UndefinedNotifyId');
  const done = useSagaDone({ $niama, opts, notifyId: notifyOnDone || notify ? notifyId : undefined, redirect: redirectOnDone ?? redirect });
  const fail = useSagaFail({ $niama, opts, notify: notifyOnFail || notify, redirect: redirectOnFail ?? redirect });
  return { $niama, done, fail };
};

const useSagaDone = <D, S, F>({ $niama: { router }, notifyId, opts, redirect }: T.UseSagaDoneP<D, S, F>): T.Observabler<D, S> => (s: S) =>
  sagaDone(opts)(s).pipe(
    tap(() => notifyId && notifyDone(notifyId)),
    switchMap((done) => (redirect ? router.replace(isFunction(redirect) ? redirect(done) : redirect).then(() => done) : of(done)))
  );

const useSagaFail = <D, S, F>({ $niama: { router }, notify, opts, redirect }: T.UseSagaFailP<D, S, F>): T.Observabler<D | F, Error> => {
  if (notify) return notifyFail$;
  if (!redirect) return sagaFail(opts);
  return observabler<F, Error>((e) => {
    router.replace(isFunction(redirect) ? redirect(e) : redirect);
    return (null as unknown) as F;
  })!;
};
