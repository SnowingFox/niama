import { getProvider, hasProvider } from '@niama/core';
import { getOrmRp, ormPoF } from '@niama/orm';
import { useQuery, useResult } from '@vue/apollo-composable';
import { struct } from 'superstruct';

import * as T from './types';
import { getError } from './utils';

// REPOSITORY ==============================================================================================================================

/*export const rp: T.Orm.Rp<T.Cfg> = getOrmRp({
  singular: 'user',
  F: { main: [...ormPoF, 'email', 'username'] },
  extra: { factories: { readCurrent: { type: 'query', selector: 'userCurrent', local: true } } },
});*/

export const getRp = <C extends T.Orm.Cfg>(p: Omit<T.Orm.GetRpP<C, 'readCurrent'>, 'singular'>): T.Orm.Rp<C> =>
  getOrmRp(({
    singular: 'user',
    ...p,
    extra: { factories: { ...(p.extra || {})['factories'], readCurrent: { type: 'query', selector: 'userCurrent', local: true } } },
  } as unknown) as T.Orm.GetRpP<C>);

export const rp: T.Orm.Rp<T.Cfg> = getRp({ F: { main: [...ormPoF, 'email', 'username'] } });

// LOCAL ===================================================================================================================================

export const getSeed = async (p: T.GetSeedP): Promise<any> => {
  const { currentFromAuthPayload, users = [] } = p;
  if (!hasProvider('auth')) return { users };
  if (!currentFromAuthPayload) throw getError(`getSeed.UndefinedCurrentFromAuthPayload`);
  const $auth = getProvider('auth');
  const payload = await $auth.fetch();
  if (!payload) return { users };
  const current = currentFromAuthPayload(payload);
  return { [rp.L.readCurrent]: { __typename: 'User', id: current.id }, [rp.L.readMany]: [...users, current] };
};

// USES ====================================================================================================================================

export const getUseReadCurrent = <C extends T.Orm.Cfg, Vo = T.Po, Dto = T.Po>(p: T.UseReadCurrentP<C, Vo, Dto>): T.UseReadCurrentR<Vo> => {
  const { debug = false, fallback = null, fields, update = (dto) => (dto as unknown) as Vo, validation } = p;
  const rp = p.rp as T.Orm.Rp<T.Cfg>; // TO CHECK
  const { error, loading, result } = useQuery<T.Dict<Dto>>(rp.O.readCurrent(fields));
  const item: T.Api.R<T.Maybe<Vo>> = useResult<T.Dict<Dto>, T.Maybe<Vo>, T.Maybe<Vo>>(result, fallback, (data) => {
    try {
      const dto = data[rp.L.readCurrent];
      if (debug) console.log(rp.L.readCurrent, 'gets dto', dto);
      const value = dto ? update(validation ? struct(validation)(dto) : dto) : fallback;
      if (debug) console.log(rp.L.readCurrent, 'returns item', value);
      return value;
    } catch (error) {
      if (debug) console.error(rp.L.readCurrent, 'errored :', error);
      return null;
    }
  });

  return { error, item, loading };
};

export const useReadCurrent = <Vo = T.Po, Dto = T.Po>(p: T.UseReadCurrentTypedP<T.Cfg, Vo, Dto>): T.UseReadCurrentR<Vo> =>
  getUseReadCurrent({ rp, ...p });
