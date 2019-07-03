import { Inject, Injectable } from '@nestjs/common';
import { ApiS } from '@niama/api/back';
import { getAuthCapsD } from '@niama/auth';
import { OrmS } from '@niama/orm/back';
import { hash } from 'bcryptjs';

import { labels } from '../universal/u.user.helper';
import { User as UserB } from '../universal/u.user.model.entity';
import { UserBC } from './b.user.model.create';

// import { authSignupUserBc } from 'src/auth/services/u.auth.transformers';

@Injectable()
export class UserS<Role extends string, User extends UserB<Role>, Prisma extends N.ApiPrisma = N.ApiPrisma> extends OrmS<
  User,
  Role,
  Prisma,
  N.UserOrm
> {
  // LIFECYCLE =============================================================================================================================

  constructor(protected apiS: ApiS<Prisma>, @Inject('User') protected userClass: N.Type<User>) {
    super(apiS, labels);
  }

  // OVERRIDE ==============================================================================================================================

  /*async create(data: N.UserBC): Promise<N.UserBR> {
    const password: string = await this.encryptUserPassword('mdp');
    return super.create({ ...data, password });
  }*/

  async grants(me: N.Maybe<User>): Promise<N.AuthGrants<N.UserOrm['Nexus']['Read'], Role>> {
    if (!me) return getAuthCapsD();
    return {
      canDelete: (user) => (user && user.id !== me.id ? me.getSharedRoles(['SUPER_ADMIN' as Role]) : []),
      canRead: me.getSharedRoles(['SUPER_ADMIN' as Role]),
      canUpdate: me.getSharedRoles(['SUPER_ADMIN' as Role]),
      canUpdateStatus: (user) => (user && user.id !== me.id ? me.getSharedRoles(['SUPER_ADMIN' as Role]) : []),
    };
  }

  /*async update(data: N.UserBU, where: N.UserWU): Promise<N.UserBR> {
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

  async readResource(where: N.UserPrisma['WhereUnique']): Promise<N.Maybe<User>> {
    const user: N.UserPrisma['Read'] = await this.read(where);
    if (!user) return null;
    const profile = await this.readProfile(user.id);
    return new this.userClass({ ...user, profile, __typename: 'User', ...getAuthCapsD() });
  }

  // PROTECTED ===============================================================================================================================

  protected encryptUserPassword = async (password: string): Promise<string> => await hash(password, 10);
}
