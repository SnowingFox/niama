import * as Api from '@niama/api/types';
import * as Auth from '@niama/auth/types';
import { Maybe } from '@niama/core/types';
import * as Orm from '@niama/orm/types';

import { Po } from './';

// BOOT ==================================================================================================================================

export interface BootP {
  currentFromAuthPayload?: (payload: Auth.Payload) => Po;
  users?: Po[];
}

// CONFIG ==================================================================================================================================

export type Cfg = Orm.Cfg<ObjectsCfg, FieldCfg, OpsCfg>;

// FIELDS ==================================================================================================================================

export type FieldCfg = Api.FieldCfg<F, SF, undefined, undefined>;
export type SF = K[];
export type F = SF;

export type K = Orm.K | 'email' | 'username';
export type DefaultK = Orm.DefaultK | Api.TypeK;

// OPS ====================================================================================================================================

export type OpsCfg = Orm.OpsCfg<W, OB, 'readCurrent', undefined>;
export type OB = any;
export type W = any;

// OBJECTS =================================================================================================================================

export type ObjectsCfg = Orm.ObjectsCfg<Po>;

// API =====================================================================================================================================

export type State = { currentUser: Maybe<Po>; users: Po[] };

export interface GetSeedP extends BootP {}

export type GetSeedR = Promise<{ currentUser?: Api.Po; users: Po[] }>;

/*import { OrmR, OrmTimeNames } from '@niama/orm';


// OBJECTS =================================================================================================================================

export interface UserBC extends NPri.UserCreateInput {}

export interface UserR<Role extends string = string> extends OrmR, Omit<NPri.User, OrmTimeNames> {
  profile: NPri.UserProfile;
  roles: Role[];
}*/

// USES ====================================================================================================================================

export type UseReadCurrentP<C extends Orm.Cfg, Vo = C['ObC']['Po'], Dto = C['ObC']['Po']> = Omit<Orm.UseReadOneP<C, Vo, Dto>, 'id'>;
export type UseReadCurrentTypedP<C extends Orm.Cfg, Vo = C['ObC']['Po'], Dto = C['ObC']['Po']> = Omit<
  Orm.UseReadOneTypedP<C, Vo, Dto>,
  'id'
>;
export type UseReadCurrentR<Vo> = Orm.UseReadOneR<Vo>;
