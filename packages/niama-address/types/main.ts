import * as Api from '@niama/api/types';

// BOOT ====================================================================================================================================

export interface BootP {
  ui?: Ui;
  Vue: any;
}

export type Ui = 'quasar';

// PROVIDER ================================================================================================================================

export interface Provider<Service = any> {
  service: Service;
}

// OBJECTS =================================================================================================================================

export interface Dto extends Api.Dto, Vo {}

export interface Suggestion {
  placeId: string;
  label: string;
  types: string[];
}

export interface Vo extends Api.Vo {
  country: string;
  label: string;
  lat: number;
  lng: number;
  route: string;
  streetNumber: string;
  zipcode: string;
}
