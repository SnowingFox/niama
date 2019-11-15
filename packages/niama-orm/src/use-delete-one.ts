import { useApi } from '@niama/api';
import { getLoadable, getSourcable, notifyError$, request$, useI18n } from '@niama/core';

import * as T from './types';

export function useDeleteOne<C extends T.Config>({ debug, id, rp, source$, ...opts }: T.UseDeleteOneP<C>): T.UseDeleteOneR {
  const $niama = { api: useApi(), i18n: useI18n() };

  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () =>
    request$({ request: () => $niama.api.mutate({ mutation: rp.ops.deleteOne, variables: { where: { id } } }), ...opts });

  return { ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}
