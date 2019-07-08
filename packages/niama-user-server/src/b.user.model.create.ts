import { omit } from '@niama/core';
import { hash } from 'bcryptjs';

import { UserProfileBC } from './b.user-profile.model.create';

export class UserBC<Role extends string> implements NPri.UserCreateInput {
  static async fromDto<Role extends string>(dto: N.UserBC): Promise<UserBC<Role>> {
    return new UserBC({ password: await hash('mdp', 10), profile: dto, roles: [], username: dto.username });
  }
  
  static async fromSignup<Role extends string>(signupDto: N.AuthSignupI): Promise<UserBC<Role>> {
    return new UserBC({ password: await hash('mdp', 10), profile: signupDto, roles: [], username: signupDto.email });
  }

  password!: string;
  profile!: { create: UserProfileBC };
  roles: { set: Role[] } = { set: [] };
  username!: string;

  constructor(dto: { password: string; profile: any; roles: Role[]; username: string }) {
    Object.assign(this, omit(dto, ['profile', 'roles']));
    this.profile = { create: new UserProfileBC(dto.profile) };
    this.roles = { set: dto.roles };
  }
}
