import { bootAuth as baseBootAuth } from '@niama/auth';

import { initProvider } from './services';
import * as T from './typings';

export const bootAuth = (opts: T.BootO) => baseBootAuth({ initProvider, opts });
