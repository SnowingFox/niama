import { NiamaProvider } from './externals';

// REQUESTS ================================================================================================================================

export interface GeocoderRequestFromPlaceIdP {
  $niama: Pick<NiamaProvider, 'address'>;
  placeId: string;
}

// GEOCODER ================================================================================================================================

export declare class Geocoder {
  constructor ();
  geocode(req: GeocoderRequest, cb: (res: GeocoderResult[], status: GeocoderStatus) => void): void;
}

export type GeocoderGetFromPlaceId = (p: GeocoderGetFromPlaceIdP) => void;
export interface GeocoderGetFromPlaceIdP {
  cb: (result: GeocoderResult) => void;
  placeId: string;
}


// SHORTNAMES ==============================================================================================================================

export type GeocoderAddressComponent = google.maps.GeocoderAddressComponent;
export type GeocoderRequest = google.maps.GeocoderRequest;
export type GeocoderResult = google.maps.GeocoderResult;
export type GeocoderStatus = 'ERROR' | 'INVALID_REQUEST' | 'OK' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR' | 'ZERO_RESULTS';
