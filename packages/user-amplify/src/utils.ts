import { fragments as addressFragments } from '@niama/address-gmaps';

import * as T from './types';

export const getAddressFragmentsAsString = (addr: T.Address.Po, fragments = addressFragments): string => ''; //fragments.reduce((r, f) => (addr[f] ? `${r !== '' ? `${r}|` : ''}${f}:${addr[f]!.short}:${addr[f]!.long}` : r), '');

export const getAttrsFromAddress = (addr: T.Address.Po): T.Auth.PayloadAttrsAddress => {
  const data = getAddressFragmentsAsString(addr);
  return {
    address: addr.label,
    'custom:addressCoords': addr.lat && addr.lng ? `${addr.lat}|${addr.lng}` : '',
    'custom:addressData1': data.substr(0, 2048),
    'custom:addressData2': data.substr(2048, 2048),
    'custom:addressData3': data.substr(4096, 2048),
    'custom:addressId': addr.id,
    'custom:addressTypes': addr.types.join('|'),
  };
};

export function getAddressFragmentsDto(attr: string): any {
  //T.Address.FragmentsDto {
  const fragments = attr.split('|').reduce((r, v) => {
    const [fragment, short, long] = v.split(':');
    return { ...r, [fragment]: long, [`${fragment}SV`]: short };
  }, {});
  return addressFragments.reduce((r, f) => ({ ...r, [f]: fragments[f] || null }), {}); //as T.Address.FragmentsDto;
}

export function getAddressFragmentsDtoFromAttrs<Attrs extends T.Auth.PayloadAttrsAddress>(attrs: Attrs): any {
  //T.Address.FragmentsDto {
  return getAddressFragmentsDto(
    `${attrs['custom:addressData1']}${attrs['custom:addressData2'] || ''}${attrs['custom:addressData3'] || ''}`
  );
}

export function getAddressDtoFromAttrs<Attrs extends T.Auth.PayloadAttrsAddress>(attrs: Attrs): T.Address.Po {
  const fragments = getAddressFragmentsDtoFromAttrs(attrs);
  const [lat, lng] = attrs['custom:addressCoords'] === '' ? [null, null] : attrs['custom:addressCoords'].split('|').map((v) => +v);
  const types = attrs['custom:addressTypes'].split('|');
  return { ...fragments, lat, lng, types, __typename: 'Address', id: attrs['custom:addressId'], label: attrs.address,  };
}
