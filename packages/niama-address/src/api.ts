import { fragments } from './helper';
import * as T from './types';

// FIELDS ==================================================================================================================================

export const fields: T.F = ['__typename', 'id', 'label', 'lat', 'lng', 'types', ...fragments];
