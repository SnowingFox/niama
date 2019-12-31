import { notifyFail$, saga$, useLoadable, useNiama, useSourcable } from '@niama/core';
import { useMutation } from '@vue/apollo-composable';

import { getError } from './helper';
import * as T from './types';

export function useCreate<C extends T.Config, Dto>({ debug, getData, rp, src$, ...opts }: T.UseCreateP<C, Dto>): T.UseCreateR {
  if (!opts.fail$ && !opts.always$ && !opts.onAlways)
    opts.fail$ = () => notifyFail$({ error: getError(`${rp.labels.SINGULAR}.request.CREATE_FAIL`) });

  const { mutate } = useMutation(rp.ops.create);

  const switcher = () => saga$({ saga: () => mutate({ data: getData() }, {}), ...opts });

  return { ...(src$ ? useLoadable({ src$, switcher }) : useSourcable(switcher)) };
}
