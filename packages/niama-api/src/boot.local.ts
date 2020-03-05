import { setApiProvider } from './boot.utils';
import * as T from './types';

// BOOT ====================================================================================================================================

export const bootLocalApi = (p: T.BootLocalApiP = {}): Promise<void> => setApiProvider(p);
