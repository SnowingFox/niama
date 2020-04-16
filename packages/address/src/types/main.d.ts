import * as Api from '@niama/api/types';
import { Maybe } from '@niama/core/types';

// FIELDS ==================================================================================================================================

export type SF = K[];
export type F = SF;

// OBJECTS =================================================================================================================================

export interface Po extends Hint, Coords, Fragments {}
export type Coords = Record<CoordK, number>;
export type Fragments = Record<FragmentK, Maybe<string>>;

export interface Hint extends Api.Po {
  label: string;
  types: string[];
  value: string;
}

export type HintType = 'address' | 'city' | 'region';

// KEYS ====================================================================================================================================

export type K = Api.K | CoordK | FragmentK | 'label' | 'types';
export type CoordK = 'lat' | 'lng';

export type FragmentK =
  | 'administrativeAreaLevel1'
  | 'administrativeAreaLevel1SV'
  | 'administrativeAreaLevel2'
  | 'administrativeAreaLevel2SV'
  | 'administrativeAreaLevel3'
  | 'administrativeAreaLevel3SV'
  | 'administrativeAreaLevel4'
  | 'administrativeAreaLevel4SV'
  | 'administrativeAreaLevel5'
  | 'administrativeAreaLevel5SV'
  | 'airport'
  | 'airportSV'
  | 'country'
  | 'countrySV'
  | 'establishment'
  | 'establishmentSV'
  | 'floor'
  | 'floorSV'
  | 'intersection'
  | 'intersectionSV'
  | 'locality'
  | 'localitySV'
  | 'naturalFeature'
  | 'naturalFeatureSV'
  | 'neighborhood'
  | 'neighborhoodSV'
  | 'park'
  | 'parkSV'
  | 'parking'
  | 'parkingSV'
  | 'pointOfInterest'
  | 'pointOfInterestSV'
  | 'political'
  | 'politicalSV'
  | 'postBox'
  | 'postBoxSV'
  | 'postalCode'
  | 'postalCodeSV'
  | 'postalCodeSuffix'
  | 'postalCodeSuffixSV'
  | 'postalTown'
  | 'postalTownSV'
  | 'premise'
  | 'premiseSV'
  | 'room'
  | 'roomSV'
  | 'route'
  | 'routeSV'
  | 'streetNumber'
  | 'streetNumberSV'
  | 'sublocality'
  | 'sublocalitySV'
  | 'sublocalityLevel1'
  | 'sublocalityLevel1SV'
  | 'sublocalityLevel2'
  | 'sublocalityLevel2SV'
  | 'sublocalityLevel3'
  | 'sublocalityLevel3SV'
  | 'sublocalityLevel4'
  | 'sublocalityLevel4SV'
  | 'sublocalityLevel5'
  | 'sublocalityLevel5SV'
  | 'subpremise'
  | 'subpremiseSV';
