import { Args, Mutation, Parent, Query, ResolveProperty, Resolver, Subscription } from '@nestjs/graphql';
import { capsFromGrants } from '@niama/auth';
import { Me } from '@niama/auth-server';
import { User as UserBase } from '@niama/user';

import { profileFullName } from '../universal/u.user-profile.helper';
import { UserS } from './service';
import * as T from './types';

@Resolver('User')
export class UserRS<Role extends string, User extends UserBase<Role>> {
  // LIFECYCLE =============================================================================================================================

  constructor(protected userS: UserS<Role, User>) {}

  // PROPERTIES ============================================================================================================================

  @ResolveProperty('canDelete')
  async getCanDelete(@Me() me: User, @Parent() item: T.UserOrm['Nexus']['Read']): Promise<Role[]> {
    return capsFromGrants(item, await this.userS.grants(me)).canDelete;
  }

  @ResolveProperty('canRead')
  async getCanRead(@Me() me: User, @Parent() item: T.UserOrm['Nexus']['Read']): Promise<Role[]> {
    return capsFromGrants(item, await this.userS.grants(me)).canRead;
  }

  @ResolveProperty('canUpdate')
  async getCanUpdate(@Me() me: User, @Parent() item: T.UserOrm['Nexus']['Read']): Promise<Role[]> {
    return capsFromGrants(item, await this.userS.grants(me)).canUpdate;
  }

  @ResolveProperty('canUpdateStatus')
  async getCanUpdateStatus(@Me() me: User, @Parent() item: T.UserOrm['Nexus']['Read']): Promise<Role[]> {
    return capsFromGrants(item, await this.userS.grants(me)).canUpdateStatus;
  }

  @ResolveProperty('label')
  async readLabel(@Parent() { id }: NexusGen['rootTypes']['User']): Promise<NexusGen['fieldTypes']['User']['label']> {
    const { firstNames, lastName }: NPri.UserProfile = await this.userS.readProfile(id);
    return profileFullName(firstNames, lastName) as string;
  }

  @ResolveProperty('profile')
  async readProfile(@Parent() { id }: NexusGen['rootTypes']['User']): Promise<NexusGen['fieldTypes']['User']['profile']> {
    return await this.userS.readProfile(id);
  }

  // QUERIES ===============================================================================================================================

  @Query('usersCount')
  async count(): Promise<NexusGen['fieldTypes']['Query']['usersCount']> {
    return await this.userS.count();
  }

  @Query('users')
  async readMany(
    @Me() me: NPri.User,
    @Args() args: T.Orm.ReadManyArgs<T.UserW, T.UserOB>
  ): Promise<NexusGen['fieldTypes']['Query']['users']> {
    return (await this.userS.readMany({ orderBy: 'username_DESC' })) as any;
    // return $ormManyWithCaps(await this.userS.caps(user), await this.userS.readMany({ orderBy: 'label_ASC', ...args }));
  }

  @Query('user')
  async read(@Args('where') where: NexusGen['inputTypes']['UserWhereUniqueInput']): Promise<NexusGen['fieldTypes']['Query']['user']> {
    return (await this.userS.read(where)) as any;
  }

  // MUTATIONS =============================================================================================================================

  /*@Mutation('createUser')
  async create(@Args('data') data: A.UserBC): Promise<A.User> {
    return $ormWithCaps(await this.userS.caps(user), await this.userS.create(data));
  }

  @Mutation('deleteUser')
  async delete(@Args('where') where: A.UserWU): Promise<A.User> {
    return await this.userS.delete(where);
  }

  @Mutation('deleteManyUsers')
  async deleteMany(@Args('where') where: A.UserW): Promise<NPri.BatchPayload> {
    return await this.userS.deleteMany(where);
  }

  @Mutation('updateUser')
  async update(@Args('data') data: A.UserBU, @Args('where') where: A.UserWU): Promise<A.User> {
    const user: A.User = await this.userS.read(where);

    let types: A.UserType[] = user.types;
    if (data.profile && user.roles.includes('SUBSTITUTE')) {
      types = $difference<A.UserType>(types, ['ATV', 'CEV', 'MISSIONARY', 'UNKNOWN']);
      if (['RETIRED', 'STUDENT'].includes(data.profile.update.professionCategory)) types.push('ATV');
      else if (['CIVIL_SERVANT'].includes(data.profile.update.professionCategory) && !!data.profile.update.professionMissionary)
        types.push('MISSIONARY');
      else types.push('CEV');
    }

    return await this.userS.update({ ...data, types: { set: types } }, where);
  }*/

  // SUBSCRIPTIONS =========================================================================================================================

  @Subscription('user')
  deleted(@Args('where') where: any) {
    return this.userS.deleted(where);
  }
}
