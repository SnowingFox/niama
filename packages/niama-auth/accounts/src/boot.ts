import { boot as baseBoot } from '../../src/boot';
import { initProvider } from './service';
import * as T from './types';

export const boot = (p: T.BootP) => baseBoot(p, initProvider);
