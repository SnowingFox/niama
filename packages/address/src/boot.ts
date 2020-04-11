import { setProvider } from '@niama/core';

import * as T from './types';

export const bootAddress = ({ initProvider, opts }: T.BootAddressP) => {
  const provider = initProvider(opts);
  setProvider({ id: 'address', provider });
};
