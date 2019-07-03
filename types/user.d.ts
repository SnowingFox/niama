import * as C from './core';
import * as CR from './orm';

// MAIN ====================================================================================================================================

export type UserOrm = CR.Orm<UserNexus, UserPrisma>;

export type UserNexus = CR.OrmNexus<NPri.User>;

export type UserPrisma = CR.OrmPrisma<
  NPri.UserCreateInput,
  NPri.UserOrderByInput,
  NPri.User,
  NPri.UserSubscriptionPayload,
  NPri.UserSubscriptionWhereInput,
  NPri.UserUpdateInput,
  NPri.UserWhereInput,
  NPri.UserWhereUniqueInput
>;

// OBJECTS =================================================================================================================================

export interface UserBC extends NPri.UserCreateInput {}

export interface UserR<Role extends string = string> extends CR.OrmR, C.Omit<NPri.User, CR.OrmTimeFNames> {
  profile: NPri.UserProfile;
  roles: Role[];
}

// FIELDS ==================================================================================================================================

export type UserF =
  | {
      _: (keyof NPri.User)[];
      profile: UserProfileF;
    }
  | (keyof NPri.User)[];

export type UserProfileF = (keyof NPri.UserProfile)[];
