import * as T from './typings';
import { fragments } from './utils';

// FIELDS ==================================================================================================================================

export const fields: T.F = ['__typename', 'id', 'label', 'lat', 'lng', 'types', ...fragments];
