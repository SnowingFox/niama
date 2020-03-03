import { Type } from '@niama/core/types';

import { Geocoder } from './geocoder';
import { InfoWindow } from './info-window';
import { ApiLibrary } from './main';
import { Map } from './map';
import { Marker } from './marker';
import { PlacesAutocompleteS, PlacesS } from './places';

declare module '@niama/address/types' {
  interface BootO {
    apiKey: string;
    language?: string;
    libraries?: ApiLibrary[];
    region?: string;
  }

  interface Service {
    Geocoder: Type<Geocoder>;
    InfoWindow: Type<InfoWindow>;
    Map: Type<Map>;
    Marker: Type<Marker>;
    places: {
      AutocompleteService: Type<PlacesAutocompleteS>;
      PlacesService: Type<PlacesS>;
    };
  }
}

export * from '@niama/address/types';
export * from './geocoder';
export * from './info-window';
export * from './main';
export * from './map';
export * from './marker';
export * from './places';
