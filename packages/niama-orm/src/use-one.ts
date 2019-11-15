import { useApi } from '@niama/api';
import { ref } from '@vue/composition-api';
import { struct } from 'superstruct';

import * as T from './types';

export function useOne<C extends T.Config, Vo, Dto extends object = C['Dto']>(p: T.UseOneP<C, Vo, Dto>): T.UseOneR<Vo> {
  const { debug = false, fallback = null, fields, id, manual = false, rp, update = (dto) => dto, validation } = p;
  const $niama = { api: useApi() };
  const item: T.Ref<Vo> = ref(fallback);
  const loading = ref(true);

  $niama.api.addSmartQuery('readOne', {
    query: () => rp.ops.readOne({ fields }),
    variables: () => ({ where: { id } }),
    result: (r) => {
      const dto: T.Maybe<Dto> = (r.data && r.data[rp.labels.READ_ONE]) || null;
      if (debug) console.log(rp.labels.READ_ONE, 'with id', id, 'gets dto', dto);
      const value = dto ? update(validation ? struct(validation)(dto) : dto) : fallback;
      if (debug) console.log(rp.labels.READ_ONE, 'with id', id, 'returns item', value);
      item.value = value;
      loading.value = r.loading;
    },
    skip: () => manual,
    manual: true,
  });

  return { item, loading };
}
