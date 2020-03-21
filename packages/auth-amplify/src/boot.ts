import { bootAuth as baseBootAuth } from '@niama/auth';

import { initProvider } from './service';
import * as T from './types';

export const bootAuth = (opts: T.BootAuthO) => baseBootAuth({ initProvider, opts });
