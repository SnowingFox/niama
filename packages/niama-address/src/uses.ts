/*import { reactive } from '@vue/composition-api';

import { useAddress } from './provider';
import * as T from './types';
import { getLoadable, getSourcable } from '@niama/core';

export function useSuggest({ input, source$, ...opts }: T.UseSuggestP): T.UseSuggestR {
  const $niama = { address: useAddress() };

  if (!$niama.address.suggest$) throw new Error('address.errors.SuggestUnknown');
  if (!input) input = ref('');
  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () => $niama.address.suggest$!({ $niama, data: input });

  return { input, ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}*/