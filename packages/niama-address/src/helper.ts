import * as T from './types';

// ENUMS ===================================================================================================================================

export const longFragments: T.FragmentNames[] = [
  ...['administrativeAreaLevel1', 'administrativeAreaLevel2', 'administrativeAreaLevel3', 'administrativeAreaLevel4'],
  ...['administrativeAreaLevel5', 'airport', 'country', 'establishment', 'floor', 'intersection', 'locality', 'naturalFeature'],
  ...['neighborhood', 'park', 'parking', 'pointOfInterest', 'political', 'postBox', 'postalCode', 'postalCodeSuffix', 'postalTown'],
  ...['premise', 'room', 'route', 'streetNumber', 'sublocality', 'sublocalityLevel1', 'sublocalityLevel2', 'sublocalityLevel3'],
  ...['sublocalityLevel4', 'sublocalityLevel5', 'subpremise'],
] as T.FragmentNames[];

export const shortFragments: T.FragmentNames[] = longFragments.map((long) => `${long}SV`) as T.FragmentNames[];
export const fragments: T.FragmentNames[] = [...longFragments, ...shortFragments];
