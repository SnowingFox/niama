import { fill } from '@niama/core';

import { fragments } from './helper';
import * as T from './types';

// FIELDS ==================================================================================================================================

export const fragmentF: T.FragmentF = ['__typename', 'long', 'short'];

export const fields: T.F = {
  _: ['__typename', 'label', 'lat', 'lng', 'placeId', 'types'],
  ...fill<T.FragmentF, T.Vo, T.FragmentType>(fragmentF, ...fragments),
};
