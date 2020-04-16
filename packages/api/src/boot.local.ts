import { setApiProvider } from './boot.utils';
import * as T from './typings';

// BOOT ====================================================================================================================================

export const bootLocalApi = (p: T.BootLocalApiP = {}): Promise<void> => setApiProvider(p);
