import { BootO } from '@niama/address/types';
import { Dict } from '@niama/core/types';

import { PlacesResult } from './places';

export type Result = Pick<PlacesResult, 'address_components' | 'formatted_address' | 'geometry' | 'place_id' | 'types'>;

// PROVIDER ================================================================================================================================

export type ApiLibrary = 'drawing' | 'geometry' | 'places' | 'visualization';

// UTILS ===================================================================================================================================

export interface GetApiUrlP {
  callback: string;
  opts: BootO;
}

export interface GetGeocodeUrlP {
  opts: BootO;
  placeId: string;
}

export interface GetPlaceDetailsUrlP {
  opts: BootO;
  placeId: string;
}

export interface GetUrlP {
  id: string;
  opts: BootO;
  params: Partial<Dict<any>>;
}
