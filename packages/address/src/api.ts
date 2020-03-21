import * as T from './types';
import { fragments } from './utils';

// FIELDS ==================================================================================================================================

export const fields: T.F = ['__typename', 'id', 'label', 'lat', 'lng', 'types', ...fragments];
