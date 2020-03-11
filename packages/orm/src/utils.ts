import { getError as baseGetError } from '@niama/core';
import { defer } from 'rxjs';

import * as T from './types';

export const updateItem = async ({ $niama, data, id, rp }) =>
  await $niama.api.mutate({
    mutation: rp.ops.update,
    variables: { data, where: { id } },
  });

export const update$ = <C extends T.Cfg>({ $niama, data, id, rp }: UpdateP<C>): T.Observable =>
  defer(() =>
    $niama.api.mutate({
      mutation: rp.O.update(),
      variables: { data, where: { id } },
    })
  );

export interface UpdateP<C extends T.Cfg> {
  $niama: Pick<T.Niama, 'api'>;
  data: Partial<C['ObC']['Po']>;
  id: string;
  rp: T.Rp<C>;
}

// ERROR ===================================================================================================================================

export const getError = (id: string): Error => baseGetError({ id, type: 'orm' });

// IS ======================================================================================================================================

export const isGetDocumentNodeP = <F extends T.Api.F>(p: T.GetDocumentNodeP<F> | F): p is T.GetDocumentNodeP<F> =>
  p !== undefined && 'fields' in p;
