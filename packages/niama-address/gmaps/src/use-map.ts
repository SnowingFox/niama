import { onMounted } from '@vue/composition-api';
import { AsyncSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { useAddress } from './provider';
import * as T from './types';

export const useMap = () => {
  const { service$ } = useAddress();
  const mounted$ = new AsyncSubject();

  onMounted(() => {
    mounted$.next(true);
    mounted$.complete();
  });

  return { service$: forkJoin(mounted$, service$).pipe(map(([_mounted$, $]) => $)) };
};
