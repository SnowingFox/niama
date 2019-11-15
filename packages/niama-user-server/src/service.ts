import { Inject, Injectable } from '@nestjs/common';
import { ApiS } from '@niama/api-server';
import { getCapsD } from '@niama/auth';
import { OrmS } from '@niama/orm-server';
import { labels, User as UserBase } from '@niama/user';
import { hash } from 'bcryptjs';

import { UserBC } from './model.create';
import * as T from './types';

// import { authSignupUserBc } from 'src/auth/services/u.auth.transformers';

@Injectable()
export class UserS<Role extends string, User extends UserBase<Role>, Prisma extends T.ApiPrisma = T.ApiPrisma> extends OrmS<
  User,
  Role,
  Prisma,
  T.Orm
> {
  // LIFECYCLE =============================================================================================================================

  constructor(protected apiS: ApiS<Prisma>, @Inject('User') protected userClass: T.Type<User>) {
    super(apiS, labels);
  }

  // OVERRIDE ==============================================================================================================================

  /*async create(data: T.UserBC): Promise<T.UserBR> {
    const password: string = await this.encryptUserPassword('mdp');
    return super.create({ ...data, password });
  }*/

  async grants(me: T.Maybe<User>): Promise<T.Auth.Grants<T.Orm['Nexus']['Read'], Role>> {
    if (!me) return getCapsD();
    return {
      canDelete: (user) => (user && user.id !== me.id ? me.getSharedRoles(['SUPER_ADMIN' as Role]) : []),
      canRead: me.getSharedRoles(['SUPER_ADMIN' as Role]),
      canUpdate: me.getSharedRoles(['SUPER_ADMIN' as Role]),
      canUpdateStatus: (user) => (user && user.id !== me.id ? me.getSharedRoles(['SUPER_ADMIN' as Role]) : []),
    };
  }

  /*async update(data: T.UserBU, where: T.UserWU): Promise<T.UserBR> {
    return super.update($omit(data, ['password']), where);
  }*/

  // METHODS ===============================================================================================================================

  async createFromSignup(data): Promise<User> {
    const user = await this.create(await UserBC.fromSignup(data));
    return new this.userClass(user);
  }

  async readProfile(id: NPri.ID_Input): Promise<NPri.UserProfile> {
    return (this.apiS.prisma as any).user({ id }).profile();
  }

  async readResource(where: T.UserPrisma['WhereUnique']): Promise<T.Maybe<User>> {
    const user: T.UserPrisma['Read'] = await this.read(where);
    if (!user) return null;
    const profile = await this.readProfile(user.id);
    return new this.userClass({ ...user, profile, __typename: 'User', ...getCapsD() });
  }

  // PROTECTED ===============================================================================================================================

  protected encryptUserPassword = async (password: string): Promise<string> => await hash(password, 10);
}
