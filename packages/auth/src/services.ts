import { getProvider } from '@niama/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { query } from './api';
import * as T from './typings';

export const refresh$ = <D>({ redirect, switcher = (a) => of((a as unknown) as D) }: T.Refresh$P<D>): T.Observable<D> => {
  const $api = getProvider('api');
  const $router = getProvider('router');

  return $api.resetStore$.pipe(
    switchMap(query),
    switchMap(switcher),
    switchMap((done) => (redirect ? $router.replace(redirect).then(() => done) : of(done)))
  );
};
