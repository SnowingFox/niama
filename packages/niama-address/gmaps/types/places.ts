import { Maybe } from '@niama/core/types';

import { NiamaProvider } from './externals';
import { Vo } from './main';

// REQUESTS ================================================================================================================================

export interface PlacesRequestDetailsP {
  $niama: Pick<NiamaProvider, 'address'>;
  placeId: string;
}

// SERVICES ================================================================================================================================

export declare class PlacesAutocompleteS {
  constructor();
  getPlacePredictions(req: PlacesAutocompletionRequest, cb: (res: PlacesPrediction[], status: PlacesStatus) => void): void;
  getQueryPredictions(req: PlacesQueryAutocompletionRequest, cb: (res: PlacesQueryPrediction[], status: PlacesStatus) => void): void;
}

export declare class PlacesS {
  constructor(attrContainer: HTMLDivElement | google.maps.Map);
  findPlaceFromPhoneNumber(req: PlacesFromPhoneNumberRequest, cb: (res: PlacesResult[], status: PlacesStatus) => void): void;
  findPlaceFromQuery(req: PlacesFromQueryRequest, cb: (res: PlacesResult[], status: PlacesStatus) => void): void;
  getDetails(req: PlacesDetailsRequest, cb: (res: PlacesResult, status: PlacesStatus) => void): void;
  nearbySearch(req: PlacesSearchRequest, cb: (res: PlacesResult[], status: PlacesStatus, pag: PlacesPagination) => void): void;
  textSearch(req: PlacesTextSearchRequest, cb: (res: PlacesResult[], status: PlacesStatus, pag: PlacesPagination) => void): void;
}

// USES ====================================================================================================================================

export type PlacesGetDetails = (p: PlacesDetailsRequest) => Promise<Maybe<Vo>>;
// export type PlacesGetFromInput = (p: PlacesAutocompletionRequest) => Promise<Vo[]>;

export interface PlacesUseP {
  countries?: string[];
  fields?: string[];
  type?: PlacesType;
}

// OBJECTS =================================================================================================================================

export type PlacesType = 'address' | 'establishment' | 'geocode' | '(cities)' | '(regions)';

// SHORTNAMES ==============================================================================================================================

export type PlacesAutocompletionRequest = google.maps.places.AutocompletionRequest;
export type PlacesDetailsRequest = google.maps.places.PlaceDetailsRequest;
export type PlacesFromPhoneNumberRequest = google.maps.places.FindPlaceFromPhoneNumberRequest;
export type PlacesFromQueryRequest = google.maps.places.FindPlaceFromQueryRequest;
export type PlacesPagination = google.maps.places.PlaceSearchPagination;
export type PlacesPrediction = google.maps.places.AutocompletePrediction;
export type PlacesQueryAutocompletionRequest = google.maps.places.QueryAutocompletionRequest;
export type PlacesQueryPrediction = google.maps.places.QueryAutocompletePrediction;
export type PlacesResult = google.maps.places.PlaceResult;
export type PlacesSearchRequest = google.maps.places.PlaceSearchRequest;
export type PlacesStatus = google.maps.places.PlacesServiceStatus;
export type PlacesTextSearchRequest = google.maps.places.TextSearchRequest;
