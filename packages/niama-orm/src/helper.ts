import { getError as baseGetError } from '@niama/core';
import { defer } from 'rxjs';

import * as T from './types';

export const updateItem = async ({ $niama, data, id, rp }) =>
  await $niama.api.mutate({
    mutation: rp.ops.update,
    variables: { data, where: { id } },
  });

export function update$<C extends T.Config>({ $niama, data, id, rp }: UpdateP<C>): T.Observable {
  return defer(() =>
    $niama.api.mutate({
      mutation: rp.ops.update,
      variables: { data, where: { id } },
    })
  );
}

export interface UpdateP<C extends T.Config> {
  $niama: Pick<T.Niama, 'api'>;
  data: Partial<C['Dto']>;
  id: string;
  rp: T.RP<C>;
}

// ERROR ===================================================================================================================================

export const getError = (id: string): Error => baseGetError({ id, type: 'orm' });
