import { useAuth } from '@niama/auth';
import { getLabels, getOps, ormDtoF, useOne } from '@niama/orm';

import * as T from './types';

// REPOSITORY ==============================================================================================================================

export const labels: T.Orm.Labels = getLabels({ singular: 'user' });
export const fields: T.F = [...ormDtoF, 'email', 'username'];
export const ops: T.Orm.Ops<T.F> = getOps({ fields, labels });
export const rp: T.Orm.RP<T.Config> = { fields, labels, ops };

// LOCAL ===================================================================================================================================


export function getInitialData<C extends T.Orm.Config, AuthC extends T.Auth.Config>(p: T.GetInitialDataP<C, AuthC>) {
  const { $niama, dtoFromAuthCurrentDto, dtos, rp } = p;
  return { users: [...dtos, ...($niama.auth.current.dto ? [dtoFromAuthCurrentDto($niama.auth.current.dto)] : [])] };
}

export function getUseCurrent<C extends T.Orm.Config, Vo, Dto extends object = C['Dto']>(rp: T.Orm.RP<C>) {
  return (p?: Omit<T.Orm.UseOneTypedP<C, Vo, Dto>, 'id'>) => {
    const auth = useAuth();
    return useOne({ ...p, rp, id: auth.current.id || '' });
  };
}