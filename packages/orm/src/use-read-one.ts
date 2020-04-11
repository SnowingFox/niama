import { useQuery, useResult } from '@vue/apollo-composable';
import { struct } from 'superstruct';

import * as T from './types';

const fromDto = <C extends T.Cfg, Vo = C['ObC']['Po'], Dto = C['ObC']['Po']>(p: T.UseReadOneP<C, Vo, Dto>) => (data: T.Dict<Dto>) => {
  const { debug = false, fallback = null, id, rp, update = (dto) => (dto as unknown) as Vo, validation } = p;
  const { L } = rp;

  try {
    const dto = data[L.readOne];
    if (debug) console.log(L.readOne, 'with id', id, 'gets dto', dto);
    const value = dto ? update(validation ? struct(validation)(dto) : dto) : fallback;
    if (debug) console.log(L.readOne, 'with id', id, 'returns item', value);
    return value;
  } catch (error) {
    if (debug) console.error(L.readOne, 'with id', id, 'errored :', error);
    return null;
  }
};

export const useReadOne = <C extends T.Cfg, Vo = C['ObC']['Po'], Dto = C['ObC']['Po']>(p: T.UseReadOneP<C, Vo, Dto>): T.UseReadOneR<Vo> => {
  const { fallback = null, fields, id, rp } = p;
  const { error, loading, result } = useQuery<T.Dict<Dto>>(rp.O.readOne({ fields }), { where: { id } });
  const item: T.Api.R<T.Maybe<Vo>> = useResult<T.Dict<Dto>, T.Maybe<Vo>, T.Maybe<Vo>>(result, fallback, fromDto(p));
  return { error, item, loading };
};
