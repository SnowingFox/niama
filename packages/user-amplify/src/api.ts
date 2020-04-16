import { merge } from '@niama/core';
import { getOrmPoD } from '@niama/orm';

//import { getRp, getUseReadCurrent, rp as baseRp } from '@niama/user/src/api';
import { getRp, getUseReadCurrent, rp as baseRp } from '../../user/src/api';
import * as T from './typings';

// REPOSITORY ==============================================================================================================================

//export { getRp, getUseReadCurrent } from '@niama/user/src/api';
export { getRp, getUseReadCurrent } from '../../user/src/api';
export const rp: T.Orm.Rp<T.Cfg> = getRp({ F: merge(baseRp.F, { main: ['emailVerified'] }) });

// DEFAULTS ================================================================================================================================

export const getPoD = (): Pick<T.Po, T.DefaultK> => ({ ...getOrmPoD(), __typename: 'User', emailVerified: false });

// DEFAULTS ================================================================================================================================

export const useReadCurrent = <Vo = T.Po, Dto = T.Po>(p: T.UseReadCurrentTypedP<T.Cfg, Vo, Dto>): T.UseReadCurrentR<Vo> =>
  getUseReadCurrent({ rp, ...p });
