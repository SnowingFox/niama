import { camelCase } from '@niama/core';

import * as T from './types';

// PROPOSAL TRANSFORMERS ===================================================================================================================

export const proposalFromPrediction = ({ id, description: label, place_id: value, types }: T.PlacesPrediction): T.Proposal => {
  return { __typename: 'AddressProposal', id, label, types, value };
};
export const proposalsFromPredictions = (p: T.Maybe<T.PlacesPrediction[]>): T.Proposal[] => (p || []).map(proposalFromPrediction);

// DTO TRANSFORMERS ========================================================================================================================

export function fromResult({ formatted_address: label, place_id: id, types, ...r }: T.Result): T.Po {
  let resource = { __typename: 'Address', id, label, types, lat: r.geometry!.location.lat(), lng: r.geometry!.location.lng(), value: id };
  const components = [...r.address_components!];
  while (components.length > 0) {
    const { long_name, short_name, types } = components.shift() as T.GeocoderAddressComponent;
    const key = camelCase(types.shift());
    resource = { ...resource, [key]: long_name, [`${key}SV`]: short_name };
  }
  return resource as T.Po;
}

// URLS ====================================================================================================================================

export const baseUrl: string = process.env.DEV ? '/gmaps/' : 'https://maps.googleapis.com/maps/api/';

export const getUrl = ({ id, opts: { apiKey: key, language, region }, params = {} }: T.GetUrlP): string =>
  `${baseUrl}${id}?${Object.entries({ key, language, region, ...params })
    .filter(([_k, v]) => v !== undefined)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')}`;

export const getApiUrl = ({ callback, opts }: T.GetApiUrlP): string =>
  getUrl({ opts, id: 'js', params: { callback, libraries: opts.libraries && opts.libraries.join(',') } });

export const getGeocodeUrl = ({ opts, placeId }: T.GetGeocodeUrlP): string =>
  getUrl({ opts, id: 'geocode/json', params: { place_id: placeId } });

export const getPlaceDetailsUrl = ({ opts, placeId }: T.GetPlaceDetailsUrlP): string =>
  getUrl({ opts, id: 'place/details/json', params: { place_id: placeId } });

// UTILS ===================================================================================================================================

export const getLocation = (addr?: T.Po): string =>
  addr ? `${addr.postalCode} (${addr.administrativeAreaLevel1SV || addr.administrativeAreaLevel1})` : '';
