import { bootAddress as baseBootAddress } from '@niama/address';

import { initProvider } from './services';
import * as T from './types';

export const bootAddress = (opts: T.BootO) => baseBootAddress({ initProvider, opts });
