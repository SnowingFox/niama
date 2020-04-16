import { useQuery, useResult } from '@vue/apollo-composable';
import { ref } from '@vue/composition-api';
import { struct } from 'superstruct';

import * as T from './typings';
import { getError } from './utils';

const getFromData = <C extends T.Cfg, Vo, Dto>(p: T.UseReadManyP<C, Vo, Dto>) => (data: T.Dict<Dto[]>): Vo[] => {
  const { debug = false, rp, update = (dto) => (dto as unknown) as Vo, validation, where } = p;
  if (data === undefined) throw getError('UnknownQuery');
  const dtos: Dto[] = (data && data[rp.L.readMany]) || [];
  if (debug) console.log(rp.L.readMany, 'where', where, 'gets dtos', dtos);
  const value = dtos.map((dto) => update(validation ? struct(validation)(dto) : dto));
  if (debug) console.log(rp.L.readMany, 'where', where, 'returns items', value);
  return value;
};

export const useReadMany = <C extends T.Cfg, Vo = C['ObC']['Po'], Dto = C['ObC']['Po']>(
  p: T.UseReadManyP<C, Vo, Dto>
): T.UseReadManyR<Vo> => {
  const { fetchPolicy = 'cache-first', fields, limit, rp, offset = 0, where } = p;
  const count: T.Ref<T.Maybe<number>> = ref(null);
  const total: T.Ref<T.Maybe<number>> = ref(null);

  const { error, loading, refetch, result } = useQuery<T.Dict<Dto[]>>(rp.O.readMany({ fields }), { limit, offset, where }, { fetchPolicy });
  const items: T.Api.R<Vo[]> = useResult<T.Dict<Dto[]>, Vo[], Vo[]>(result, [], getFromData(p));

  const fetchMore = async (_index: number, done: Function) => await done();

  return { count, error, fetchMore, items, loading, refetch, total };
};

/*
const items: T.Ref<T.Maybe<Vo[]>> = ref(null);
const loading = ref(true);
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
    result: ({ data, loading: isLoading }) => {
      if (data === undefined) throw new Error(`Unknown query trying to get items: ${rp.labels.READ_MANY}`);
      const dtos: Dto[] = (data && data[rp.labels.READ_MANY]) || [];
      if (debug) console.log(rp.labels.READ_MANY, 'where', where, 'gets dtos', dtos);
      const value = dtos.map((dto) => update(validation ? struct(validation)(dto) : dto));
      if (debug) console.log(rp.labels.READ_MANY, 'where', where, 'returns items', value);
      items.value = value;
      loading.value = isLoading;
    },
    error: (error) => {
      if (debug) console.error(rp.labels.READ_MANY, 'threw error :', error);
      loading.value = false;
    },
    fetchPolicy,
    manual: true,
  });
  
  /*if (canFetchMore.value)
      await api.queries.currentItems.fetchMore({
        variables: { skip: (items.value && items.value.length) || 0 },
        updateQuery: (data, { fetchMoreResult }) => ({
          [rp.labels.READ_MANY]: [...data[rp.labels.READ_MANY], ...fetchMoreResult[rp.labels.READ_MANY]],
        }),
      });*/
