import { getError as baseGetError } from '@niama/core';

import * as T from './types';

// ENUMS ===================================================================================================================================

export const longFragments: T.FragmentK[] = [
  ...['administrativeAreaLevel1', 'administrativeAreaLevel2', 'administrativeAreaLevel3', 'administrativeAreaLevel4'],
  ...['administrativeAreaLevel5', 'airport', 'country', 'establishment', 'floor', 'intersection', 'locality', 'naturalFeature'],
  ...['neighborhood', 'park', 'parking', 'pointOfInterest', 'political', 'postBox', 'postalCode', 'postalCodeSuffix', 'postalTown'],
  ...['premise', 'room', 'route', 'streetNumber', 'sublocality', 'sublocalityLevel1', 'sublocalityLevel2', 'sublocalityLevel3'],
  ...['sublocalityLevel4', 'sublocalityLevel5', 'subpremise'],
] as T.FragmentK[];

export const shortFragments: T.FragmentK[] = longFragments.map((long) => `${long}SV`) as T.FragmentK[];
export const fragments: T.FragmentK[] = [...longFragments, ...shortFragments];

// ERROR ===================================================================================================================================

export const getError = (id: string): Error => baseGetError({ id, type: 'address' });
