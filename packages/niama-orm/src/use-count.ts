
import { ref } from '@vue/composition-api';

import * as T from './types';

export function useCount<C extends T.Config>(p: T.UseCountP<C>): T.UseCountR {
  const { debug = false, rp, where } = p;

  const count: T.Ref<T.Maybe<number>> = ref(null);
  const loading = ref(true);

  /*addSmartQuery('count', {
    query: rp.ops.count,
    variables: () => ({ where }),
    result: (r) => {
      const value = r.data ? r.data[rp.labels.COUNT] : null;
      if (debug) console.log(rp.labels.COUNT, 'where', where, 'returns', value);
      count.value = value;
      loading.value = r.loading;
    },
    manual: true,
  });*/

  return { count, loading };
}

export function getUseCount<C extends T.Config>(rp: T.RP<C>): (p: T.UseCountTypedP<C>) => T.UseCountR {
  return (p) => useCount({ ...p, rp });
}
