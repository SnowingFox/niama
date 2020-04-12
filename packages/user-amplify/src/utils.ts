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
