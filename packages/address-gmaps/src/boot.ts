import { boot as baseBoot } from '@niama/address';

import { initProvider } from './service';
import * as T from './types';

export const boot = (opts: T.BootO) => baseBoot({ initProvider, opts });
