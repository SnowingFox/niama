import { getOps, getOrmDtoD } from '@niama/orm';

import { fields as baseF, labels } from '../../src/api';
import * as T from './types';

// REPOSITORY ==============================================================================================================================

export { labels };
export const fields: T.F = [...baseF, 'emailVerified'];
export const ops: T.Orm.Ops<T.F> = getOps({ fields, labels });
export const rp: T.Orm.RP<T.Config> = { fields, labels, ops };

// DEFAULTS ================================================================================================================================

export function getDtoD<Role extends string = string>(): Omit<T.Dto, 'email' | 'id' | 'username'> {
  return { ...getOrmDtoD<Role>(), __typename: 'User', emailVerified: false };
}
