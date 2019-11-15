import { useApi } from '@niama/api';
import { computed, ref } from '@vue/composition-api';
import { struct } from 'superstruct';

import * as T from './types';

export function useMany<C extends T.Config, Vo, Dto extends object = C['Dto']>(p: T.UseManyP<C, Vo, Dto>): T.UseManyR<Vo> {
  const { debug = false, fetchAll = false, fields, first = null, rp, skip = 0, update = (dto) => dto, validation, where } = p;
  const { count: getCount = true, total: getTotal = true } = p;
  const api = useApi();

  const count: T.Ref<T.Maybe<number>> = ref(null);
  const items: T.Ref<T.Maybe<Vo[]>> = ref(null);
  const loading = ref(true);
  const total: T.Ref<T.Maybe<number>> = ref(null);

  const canFetchMore = computed(() => items.value !== null && count.value !== null && count.value > items.value.length);

  if (getCount)
    api.addSmartQuery('count', {
      query: rp.ops.count,
      variables: () => ({ where }),
      result: ({ data }) => {
        if (data === undefined) throw new Error(`Unknown query trying to get count: ${rp.labels.COUNT}`);
        const value = data ? data[rp.labels.COUNT] : null;
        if (debug) console.log(rp.labels.COUNT, 'where', where, 'returns', value);
        count.value = value;
      },
      manual: true,
    });

  if (getTotal)
    api.addSmartQuery('total', {
      query: rp.ops.count,
      result: ({ data }) => {
        if (data === undefined) throw new Error(`Unknown query trying to get total: ${rp.labels.COUNT}`);
        const value = data ? data[rp.labels.COUNT] : null;
        if (debug) console.log(rp.labels.COUNT, 'returns', value);
        total.value = value;
      },
      manual: true,
    });

  api.addSmartQuery('currentItems', {
    query: () => rp.ops.readMany({ fields }),
    variables: () => ({ first, skip, where }), // ({ first: this.first, orderBy: this.orderBy, skip: this.skip, where: this.where }),
    result: ({ data }) => {
      if (data === undefined) throw new Error(`Unknown query trying to get items: ${rp.labels.READ_MANY}`);
      const dtos: Dto[] = (data && data[rp.labels.READ_MANY]) || [];
      if (debug) console.log(rp.labels.READ_MANY, 'where', where, 'gets dtos', dtos);
      const value = dtos.map((dto) => update(validation ? struct(validation)(dto) : dto));
      if (debug) console.log(rp.labels.READ_MANY, 'where', where, 'returns items', value);
      items.value = value;
    },
    watchLoading: (isLoading) => (loading.value = isLoading),
    manual: true,
  });

  const fetchMore = async (_index: number, done: Function) => {
    if (canFetchMore.value)
      await api.queries.currentItems.fetchMore({
        variables: { skip: (items.value && items.value.length) || 0 },
        updateQuery: (data, { fetchMoreResult }) => ({
          [rp.labels.READ_MANY]: [...data[rp.labels.READ_MANY], ...fetchMoreResult[rp.labels.READ_MANY]],
        }),
      });
    done();
  };

  return { count, fetchMore, items, loading, total };
}
