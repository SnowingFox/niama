import { addressFragmentsFromString, stringifiedAddressFragments } from '@niama/address';

import * as T from './typings';

export const addressFromPayload = ({ attributes: attrs }: T.Payload): T.Address.Po => {
  const fragments = addressFragmentsFromString(
    `${attrs['custom:addressData1']}${attrs['custom:addressData2'] || ''}${attrs['custom:addressData3'] || ''}`
  );
  const [lat, lng] = attrs['custom:addressCoords'] === '' ? [0, 0] : attrs['custom:addressCoords'].split('|').map((v) => +v);
  const types = attrs['custom:addressTypes'].split('|');
  const id = attrs['custom:addressId'];
  return { ...fragments, id, lat, lng, types, __typename: 'Address', label: attrs.address, value: id };
};

export const payloadAttrsFromAddress = (po: T.Address.Po): T.PayloadAttrsAddress => {
  const data = stringifiedAddressFragments(po);
  return {
    address: po.label,
    'custom:addressCoords': po.lat && po.lng ? `${po.lat}|${po.lng}` : '',
    'custom:addressData1': data.substr(0, 2048),
    'custom:addressData2': data.substr(2048, 2048),
    'custom:addressData3': data.substr(4096, 2048),
    'custom:addressId': po.id,
    'custom:addressTypes': po.types.join('|'),
  };
};