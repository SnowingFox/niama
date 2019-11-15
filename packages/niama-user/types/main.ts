import * as Auth from '@niama/auth/types';
import { NiamaProvider } from '@niama/core/types';
import * as Orm from '@niama/orm/types';

// CONFIG ==================================================================================================================================

export type Config = Orm.Config<Dto, F, OB, W>;

// NAMES =================================================================================================================================

export type Names = Orm.Names | 'email' | 'username';

// FIELDS =================================================================================================================================

export type F = Names[];

// OBJECTS =================================================================================================================================

export interface Vo extends Orm.Vo {
  email: string;
  username: string;
}

export interface Dto extends Orm.Dto, Omit<Vo, Orm.NamesTime> {}

// CONDITIONS ==============================================================================================================================

export type OB = any;
export type W = any;

/*import { OrmR, OrmTimeNames } from '@niama/orm';

// OBJECTS =================================================================================================================================

export interface UserBC extends NPri.UserCreateInput {}

export interface UserR<Role extends string = string> extends OrmR, Omit<NPri.User, OrmTimeNames> {
  profile: NPri.UserProfile;
  roles: Role[];
}*/


export interface GetInitialDataP<C extends Orm.Config, AuthC extends Auth.Config> {
  $niama: Pick<NiamaProvider, 'auth'>;
  dtoFromAuthCurrentDto: (dto: AuthC['CurrentDto']) => C['Dto'];
  dtos: Dto[];
  rp: Orm.RP<C>;
}