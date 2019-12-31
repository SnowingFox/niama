import { notifyFail$, saga$, useLoadable, useSourcable } from '@niama/core';
import { useMutation } from '@vue/apollo-composable';

import * as T from './types';

export function useDeleteOne<C extends T.Config>({ debug, id, rp, src$, ...opts }: T.UseDeleteOneP<C>): T.UseDeleteOneR {
  if (!opts.fail$ && !opts.always$ && !opts.onAlways) opts.fail$ = notifyFail$;

  const { mutate } = useMutation(rp.ops.deleteOne);

  const switcher = () => saga$({ saga: () => mutate({ where: { id } }, {}), ...opts });

  return { ...(src$ ? useLoadable({ src$, switcher }) : useSourcable(switcher)) };
}
