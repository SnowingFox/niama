import { setProvider } from '@niama/core';

import * as T from './types';

export function boot({ initProvider, opts }: T.BootP) {
  const provider = initProvider(opts);
  setProvider({ id: 'address', provider });
}
