import { OrmR, OrmTimeNames } from '@niama/orm';

// OBJECTS =================================================================================================================================

export interface UserBC extends NPri.UserCreateInput {}

export interface UserR<Role extends string = string> extends OrmR, Omit<NPri.User, OrmTimeNames> {
  profile: NPri.UserProfile;
  roles: Role[];
}
