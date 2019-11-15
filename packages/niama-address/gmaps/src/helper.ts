import { camelCase, maybe, omit, pick } from '@niama/core';
import { struct } from 'superstruct';

import * as T from './types';

// ENUMS ===================================================================================================================================

export const fragments: T.FragmentType[] = [
  ...['administrativeAreaLevel1', 'administrativeAreaLevel2', 'administrativeAreaLevel3', 'administrativeAreaLevel4'],
  ...['administrativeAreaLevel5', 'airport', 'country', 'establishment', 'floor', 'intersection', 'locality', 'naturalFeature'],
  ...['neighborhood', 'park', 'parking', 'pointOfInterest', 'political', 'postBox', 'postalCode', 'postalCodeSuffix', 'postalTown'],
  ...['premise', 'room', 'route', 'streetNumber', 'sublocality', 'sublocalityLevel1', 'sublocalityLevel2', 'sublocalityLevel3'],
  ...['sublocalityLevel4', 'sublocalityLevel5', 'subpremise'],
] as T.FragmentType[];

// OPTION TRANSFORMERS =====================================================================================================================

export const suggestionFromPrediction = (p: T.PlacesPrediction): T.Suggestion => ({
  placeId: p.place_id,
  label: p.description,
  types: p.types,
});
export const suggestionsFromPredictions = (p: T.Maybe<T.PlacesPrediction[]>): T.Suggestion[] => (p || []).map(suggestionFromPrediction);

// DTO TRANSFORMERS ========================================================================================================================

export function dtoFromResult({ formatted_address: label, place_id: placeId, types, ...r }: T.PlacesResult): T.Dto {
  const resource = { __typename: 'Address', label, placeId, types, lat: r.geometry!.location.lat(), lng: r.geometry!.location.lng() };
  const components = [...r.address_components!];
  while (components.length > 0) {
    const { long_name, short_name, types } = components.shift() as T.GeocoderAddressComponent;
    resource[camelCase(types.shift())] = { __typename: 'AddressFragment', long: long_name, short: short_name };
  }
  return resource as T.Dto;
}

// VO TRANSFORMERS =========================================================================================================================

export function fromDto(resource: T.Dto): T.Vo {
  const entity = { ...omit(resource, ['__typename', ...fragments]) };
  fragments.forEach((f) => (entity[f] = resource[f] ? pick(resource[f]!, ['long', 'short']) : null));
  return entity as T.Vo;
}

export const fromResult = (result: T.PlacesResult): T.Vo => fromDto(dtoFromResult(result));

// VALIDATIONS =============================================================================================================================

export const addressFragment = maybe({ __typename: struct.literal('AddressFragment'), long: 'string', short: 'string' });

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

export const getLocation = (addr: T.Vo): string => `${addr.postalCode!.long}(${addr.administrativeAreaLevel1!.short})`