import { useQuery, useResult } from '@vue/apollo-composable';
import { struct } from 'superstruct';

import * as T from './types';

export function useOne<C extends T.Config, Vo, Dto extends object = C['Dto']>(p: T.UseOneP<C, Vo, Dto>): T.UseOneR<Vo> {
  const { debug = false, fallback = null, fields, id, rp, update = (dto) => dto, validation } = p;

  const { loading, result } = useQuery<Vo>(rp.ops.readOne({ fields }), { where: { id } });
  const item = useResult(result, fallback, (data) => {
    const dto = data[rp.labels.READ_ONE];
    if (debug) console.log(rp.labels.READ_ONE, 'with id', id, 'gets dto', dto);
    const value = dto ? update(validation ? struct(validation)(dto) : dto) : fallback;
    if (debug) console.log(rp.labels.READ_ONE, 'with id', id, 'returns item', value);
    return value;
  });

  return { item: item as any, loading };
}
