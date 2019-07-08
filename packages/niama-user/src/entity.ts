import { fill, hasIntersection, intersection, Map } from '@niama/core';
import { OrmEntity } from '@niama/orm';
import { compare } from 'bcryptjs';

import { UserProfile } from './entity.profile';
import { UserR } from './types';

export class User<Role extends string> extends OrmEntity<UserR<Role>, Role> {
  // STATIC ================================================================================================================================

  static schema: Map<UserR> = {
    ...OrmEntity.schema,
    ...fill('any', 'password', 'profile', 'roles', 'username'),
  };

  static defaults: Partial<UserR> = { ...OrmEntity.defaults };

  // VARIABLES =============================================================================================================================

  password!: string;
  profile!: UserProfile;
  roles!: Role[];
  username!: string;

  get canSignin(): boolean {
    return this.status === 'OK';
  }

  // LIFECYCLE =============================================================================================================================

  constructor(dto: Partial<UserR<Role>>, schema = User.schema, defaults = User.defaults) {
    super(dto, schema, defaults);
  }

  // METHODS =============================================================================================================================

  async checkPassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }

  checkRoles(roles: Role[]): boolean {
    return this.roles.toString() === roles.toString();
  }

  hasRole(role: Role): boolean {
    return this.roles.includes(role);
  }

  hasSharedRole(roles: Role[]): boolean {
    return hasIntersection(this.roles, roles);
  }

  getSharedRoles(roles: Role[]): Role[] {
    return intersection(this.roles, roles);
  }
}
