import * as Api from '@niama/api/types';
import { Dict, Maybe, Type } from '@niama/core/types';
import { AsyncSubject } from 'rxjs';

import { BootP as BaseBootP } from '../../types/main';
import { NiamaProvider } from './externals';
import { Geocoder } from './geocoder';
import { Map } from './map';
import { Marker } from './marker';
import { PlacesAutocompleteS, PlacesS } from './places';

export * from '../../types/main';

// PROVIDER ================================================================================================================================

export interface BootP extends BaseBootP, ProviderO {}

export interface Provider extends ProviderO {
  service$: AsyncSubject<Service>;
}

export interface ProviderO {
  apiKey: string;
  language?: string;
  libraries?: ApiLibrary[];
  region?: string;
}

export type ApiLibrary = 'drawing' | 'geometry' | 'places' | 'visualization';

// API =====================================================================================================================================

export interface Service {
  Geocoder: Type<Geocoder>;
  Map: Type<Map>;
  Marker: Type<Marker>;
  places: {
    AutocompleteService: Type<PlacesAutocompleteS>;
    PlacesService: Type<PlacesS>;
  };
}

// UTILS ===================================================================================================================================

export interface GetApiUrlP {
  $niama: Pick<NiamaProvider, 'address'>;
  callback: string;
}

export interface GetGeocodeUrlP {
  $niama: Pick<NiamaProvider, 'address'>;
  placeId: string;
}

export interface GetPlaceDetailsUrlP {
  $niama: Pick<NiamaProvider, 'address'>;
  placeId: string;
}

export interface GetUrlP {
  $niama: Pick<NiamaProvider, 'address'>;
  id: string;
  params: Partial<Dict<any>>;
}

// NAMES =================================================================================================================================

export type Names = '__typename' | 'label' | 'lat' | 'lng' | 'placeId' | 'types';
export type FragmentNames = '__typename' | 'long' | 'short';

export type FragmentType =
  | 'administrativeAreaLevel1'
  | 'administrativeAreaLevel2'
  | 'administrativeAreaLevel3'
  | 'administrativeAreaLevel4'
  | 'administrativeAreaLevel5'
  | 'airport'
  | 'country'
  | 'establishment'
  | 'floor'
  | 'intersection'
  | 'locality'
  | 'naturalFeature'
  | 'neighborhood'
  | 'park'
  | 'parking'
  | 'pointOfInterest'
  | 'political'
  | 'postBox'
  | 'postalCode'
  | 'postalCodeSuffix'
  | 'postalTown'
  | 'premise'
  | 'room'
  | 'route'
  | 'streetNumber'
  | 'sublocality'
  | 'sublocalityLevel1'
  | 'sublocalityLevel2'
  | 'sublocalityLevel3'
  | 'sublocalityLevel4'
  | 'sublocalityLevel5'
  | 'subpremise';

// FIELDS =================================================================================================================================

export type F = Names[] | { _: Names[] } & Record<FragmentType, FragmentF>;
export type FragmentF = FragmentNames[];

// OBJECTS =================================================================================================================================

export interface Dto extends Omit<Api.Dto, 'id'>, Omit<Vo, FragmentType>, FragmentsDto {}

export interface Fragment {
  long: string;
  short: string;
}

export interface FragmentDto extends Omit<Api.Dto, 'id'>, Fragment {}
export type Fragments = Record<FragmentType, Maybe<Fragment>>;
export type FragmentsDto = Record<FragmentType, Maybe<FragmentDto>>;

export interface Vo extends Fragments {
  label: string;
  lat: Maybe<number>;
  lng: Maybe<number>;
  placeId: string;
  types: string[];
}
