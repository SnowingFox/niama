import { Dict, Type } from '@niama/core/types';
import { AsyncSubject } from 'rxjs';

import * as Base from '../../types/main';
import { NiamaProvider } from './externals';
import { Geocoder } from './geocoder';
import { InfoWindow } from './info-window';
import { Map } from './map';
import { Marker } from './marker';
import { PlacesAutocompleteS, PlacesS } from './places';

export * from '../../types/main';

// PROVIDER ================================================================================================================================

export interface BootP extends Base.BootP, ProviderO {}

export interface Provider extends Base.Provider, ProviderO {
  service$: AsyncSubject<Service>;
}

export interface ProviderO extends Base.ProviderO {
  apiKey: string;
  language?: string;
  libraries?: ApiLibrary[];
  region?: string;
}

export type ApiLibrary = 'drawing' | 'geometry' | 'places' | 'visualization';

// API =====================================================================================================================================

export interface Service {
  Geocoder: Type<Geocoder>;
  InfoWindow: Type<InfoWindow>;
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




