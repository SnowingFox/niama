import { fragments as addressFragments } from '@niama/address/gmaps';

import * as T from './types';

export const getAddressFragmentsAsString = (addr: T.Address.Vo, fragments = addressFragments): string =>
  fragments.reduce((r, f) => (addr[f] ? `${r !== '' ? `${r}|` : ''}${f}:${addr[f]!.short}:${addr[f]!.long}` : r), '');

export const getAttrsFromAddress = (addr: T.Address.Vo): T.InfoAttrsAddress => {
  const data = getAddressFragmentsAsString(addr);
  return {
    address: addr.label,
    'custom:addressCoords': addr.lat && addr.lng ? `${addr.lat}|${addr.lng}` : '',
    'custom:addressData1': data.substr(0, 2048),
    'custom:addressData2': data.substr(2048, 2048),
    'custom:addressData3': data.substr(4096, 2048),
    'custom:addressId': addr.placeId,
    'custom:addressTypes': addr.types.join('|'),
  };
};

export function getAddressFragmentsDto(attr: string): T.Address.FragmentsDto {
  const fragments = attr.split('|').reduce((r, v) => {
    const [fragment, short, long] = v.split(':');
    return { ...r, [fragment]: { __typename: 'AddressFragment', short, long } };
  }, {});
  return addressFragments.reduce((r, f) => ({ ...r, [f]: fragments[f] || null }), {}) as T.Address.FragmentsDto;
}

export function getAddressFragmentsDtoFromAttrs<Attrs extends T.InfoAttrsAddress>(attrs: Attrs): T.Address.FragmentsDto {
  return getAddressFragmentsDto(`${attrs['custom:addressData1']}${attrs['custom:addressData2'] || ''}${attrs['custom:addressData3'] || ''}`);
}

export function getAddressDtoFromAttrs<Attrs extends T.InfoAttrsAddress>(attrs: Attrs): T.Address.Dto {
  const fragments = getAddressFragmentsDtoFromAttrs(attrs);
  const [lat, lng] = attrs['custom:addressCoords'] === '' ? [null, null] : attrs['custom:addressCoords'].split('|').map((v) => +v);
  const types = attrs['custom:addressTypes'].split('|');
  return { ...fragments, lat, lng, types, __typename: 'Address', label: attrs.address, placeId: attrs['custom:addressId'] };
}
