import { camelCase } from '@niama/core';

import * as T from './types';

// SUGGESTION TRANSFORMERS =================================================================================================================

export const suggestionFromPrediction = ({ id, description: label, place_id: value, types }: T.PlacesPrediction): T.Suggestion => {
  return { __typename: 'AddressSuggestion', id, label, types, value };
};
export const suggestionsFromPredictions = (p: T.Maybe<T.PlacesPrediction[]>): T.Suggestion[] => (p || []).map(suggestionFromPrediction);

// DTO TRANSFORMERS ========================================================================================================================

export function fromResult({ formatted_address: label, place_id: id, types, ...r }: T.PlacesResult): T.Dto {
  let resource = { __typename: 'Address', id, label, types, lat: r.geometry!.location.lat(), lng: r.geometry!.location.lng() };
  const components = [...r.address_components!];
  while (components.length > 0) {
    const { long_name, short_name, types } = components.shift() as T.GeocoderAddressComponent;
    const key = camelCase(types.shift());
    resource = { ...resource, [key]: long_name, [`${key}SV`]: short_name };
  }
  return resource as T.Dto;
}

// URLS ====================================================================================================================================

export const baseUrl: string = process.env.DEV ? '/gmaps/' : 'https://maps.googleapis.com/maps/api/';

export const getUrl = ({ $niama, id, params = {} }: T.GetUrlP): string => {
  const { apiKey: key, language, region } = $niama.address;
  return `${baseUrl}${id}?${Object.entries({ key, language, region, ...params })
    .filter(([_k, v]) => v !== undefined)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')}`;
};

export const getApiUrl = ({ $niama, callback }: T.GetApiUrlP): string =>
  getUrl({ $niama, id: 'js', params: { callback, libraries: $niama.address.libraries && $niama.address.libraries.join(',') } });

export const getGeocodeUrl = ({ $niama, placeId }: T.GetGeocodeUrlP): string =>
  getUrl({ $niama, id: 'geocode/json', params: { place_id: placeId } });

export const getPlaceDetailsUrl = ({ $niama, placeId }: T.GetPlaceDetailsUrlP): string =>
  getUrl({ $niama, id: 'place/details/json', params: { place_id: placeId } });

// UTILS ===================================================================================================================================

export const getLocation = (addr: T.Dto): string =>
  `${addr.postalCode} (${addr.administrativeAreaLevel1SV || addr.administrativeAreaLevel1})`;
