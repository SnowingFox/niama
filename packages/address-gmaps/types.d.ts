import { Type } from '@niama/core/types';

import { Geocoder } from './src/types/geocoder';
import { InfoWindow } from './src/types/info-window';
import { ApiLibrary } from './src/types/main';
import { Map } from './src/types/map';
import { Marker } from './src/types/marker';
import { PlacesAutocompleteS, PlacesS } from './src/types/places';

export * from './src/types';

declare module '@niama/address/types' {
  interface BootO {
    apiKey: string;
    language?: string;
    libraries?: ApiLibrary[];
    region?: string;
  }

  interface Raw {
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
