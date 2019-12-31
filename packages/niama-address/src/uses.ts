import { notifyFail$, useLoadable, useSourcable } from '@niama/core';
import { ref } from '@vue/composition-api';

import { useAddress } from './provider';
import * as T from './types';

export function useSuggestionsFromInput({ input, src$, ...opts }: T.UseSuggestP): T.UseSuggestR {
  const $niama = { address: useAddress() };

  if (!$niama.address.suggestionsFromInput$) throw new Error('address.error.SuggestionsFromInputUnknown');
  if (!input) input = ref('');
  if (!opts.fail$ && !opts.always$ && !opts.onAlways) opts.fail$ = (error) => notifyFail$({ $niama, error });

  const switcher = (data: string) => $niama.address.suggest$!({ $niama, data });

  return { input, ...(src$ ? useLoadable({ src$, switcher }) : useSourcable(switcher)) };
}