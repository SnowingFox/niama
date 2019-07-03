import { fill, hasIntersection, intersection } from '@niama/core';
import { OrmE } from '@niama/orm';
import { compare } from 'bcryptjs';

import { UserProfile } from './u.user-profile.model.entity';

export class User<Role extends string> extends OrmE<N.UserR<Role>, Role> {
  // STATIC ================================================================================================================================

  static schema: N.Map<N.UserR> = {
    ...OrmE.schema,
    ...fill('any', 'password', 'profile', 'roles', 'username'),
  };

  static defaults: Partial<N.UserR> = { ...OrmE.defaults };

  // VARIABLES =============================================================================================================================

  password!: string;
  profile!: UserProfile;
  roles!: Role[];
  username!: string;

  get canSignin(): boolean {
    return this.status === 'OK';
  }

  // LIFECYCLE =============================================================================================================================

  constructor(dto: Partial<N.UserR<Role>>, schema = User.schema, defaults = User.defaults) {
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
