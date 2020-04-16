import { setProvider } from '@niama/core';

import * as T from './typings';

export const bootAddress = ({ initProvider, opts }: T.BootAddressP) => {
  const provider = initProvider(opts);
  setProvider({ id: 'address', provider });
};
