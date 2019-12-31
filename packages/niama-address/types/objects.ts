import * as Api from '@niama/api/types';

// NAMES =================================================================================================================================

export type Names = Api.Names | FragmentNames | 'label' | 'lat' | 'lng' | 'types';

export type FragmentNames =
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

// OBJECTS =================================================================================================================================

export interface Dto extends Api.Dto, Suggestion, Record<FragmentNames, string> {
  lat: number;
  lng: number;
}

export interface Suggestion extends Api.Dto {
  label: string;
  types: string[];
  value: string;
}

export type SuggestionType = 'address' | 'city' | 'region';

// FIELDS ==================================================================================================================================

export type F = Names[];
