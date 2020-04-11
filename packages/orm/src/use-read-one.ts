import { useQuery, useResult } from '@vue/apollo-composable';
import { struct } from 'superstruct';

import * as T from './types';

export const useReadOne = <C extends T.Cfg, Vo = C['ObC']['Po'], Dto = C['ObC']['Po']>(p: T.UseReadOneP<C, Vo, Dto>): T.UseReadOneR<Vo> => {
  const { fallback = null, fields, id, rp } = p;
  const { error, loading, result } = useQuery<T.Dict<Dto>>(rp.O.readOne({ fields }), { where: { id } });
  const item: T.Api.R<T.Maybe<Vo>> = useResult<T.Dict<Dto>, T.Maybe<Vo>, T.Maybe<Vo>>(result, fallback, getFromData(p));
  return { error, item, loading };
};

const getFromData = <C extends T.Cfg, Vo, Dto>(p: T.UseReadOneP<C, Vo, Dto>) => (data: T.Dict<Dto>): T.Maybe<Vo> => {
  try {
    return getValue({ ...p, data });
  } catch (error) {
    return manageError({ ...p, error });
  }
};

const getValue = <C extends T.Cfg, Vo, Dto>(p: { data: T.Dict<Dto> } & T.UseReadOneP<C, Vo, Dto>): T.Maybe<Vo> => {
  const { data, debug = false, fallback = null, id, rp, update = (dto) => (dto as unknown) as Vo, validation } = p;
  const dto = data[rp.L.readOne];
  if (debug) console.log(rp.L.readOne, 'with id', id, 'gets dto', dto);
  const value = dto ? update(validation ? struct(validation)(dto) : dto) : fallback;
  if (debug) console.log(rp.L.readOne, 'with id', id, 'returns item', value);
  return value;
};

const manageError = <C extends T.Cfg, Vo, Dto>(p: { error: Error } & T.UseReadOneP<C, Vo, Dto>): null => {
  const { debug = false, error, id, rp } = p;
  if (debug) console.error(rp.L.readOne, 'with id', id, 'errored :', error);
  return null;
};
