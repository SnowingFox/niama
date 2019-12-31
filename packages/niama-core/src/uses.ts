import { ref } from '@vue/composition-api';
import { tap } from 'rxjs/operators';

import * as T from '../types';
import { useNiama } from './provider';
import { notifyFail$, sagaDone$, sagaFail$ } from './rx';
import { notifyDone } from './ui';
import { getError } from './utils';

export function useInput<Input>(initial: Input): T.UseInputR<Input> {
  const input: T.Ref<Input> = ref({ ...initial });
  return { initial, input, reset: () => (input.value = { ...initial }) };
}

export function useSagaReturns<D, S, F>(p: T.UseSagaReturnsP<D, S, F> = {}): T.UseSagaReturnsR<D, S, F> {
  const { notifyId, notify = false, notifyOnDone = false, notifyOnFail = false, ...opts } = p;
  const $niama = useNiama();
  if ((notify || notifyOnDone) && !notifyId) throw getError('useSagaReturns.NOTIFY_DONE_WITHOUT_ID');
  const fail$ = notify || notifyOnFail ? notifyFail$ : sagaFail$(opts);
  const done$ = (s: S) => sagaDone$(opts)(s).pipe(tap(() => (notify || notifyOnDone) && notifyDone(notifyId!)));
  return { $niama, done$, fail$ };
}
