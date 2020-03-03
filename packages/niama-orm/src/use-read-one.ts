import { useQuery, useResult } from '@vue/apollo-composable';
import { struct } from 'superstruct';

import * as T from './types';

export const useReadOne = <C extends T.Cfg, Vo = C['ObC']['Po'], Dto = C['ObC']['Po']>(p: T.UseReadOneP<C, Vo, Dto>): T.UseReadOneR<Vo> => {
  const { debug = false, fallback = null, fields, id, rp, update = (dto) => (dto as unknown) as Vo, validation } = p;
  const { L, O } = rp;

  const { error, loading, result } = useQuery<T.Dict<Dto>>(O.readOne({ fields }), { where: { id } });
  const item: T.Api.R<T.Maybe<Vo>> = useResult<T.Dict<Dto>, T.Maybe<Vo>, T.Maybe<Vo>>(result, fallback, (data) => {
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
  });

  return { error, item, loading };
};
