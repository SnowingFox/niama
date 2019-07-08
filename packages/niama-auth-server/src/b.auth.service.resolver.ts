import { Query, Resolver } from '@nestjs/graphql';
import { User as UserB } from '@niama/user';

import { Me } from './b.auth.decorator.me';

@Resolver()
export class AuthRS<Role extends string, User extends UserB<Role>> {
  // QUERIES ===============================================================================================================================

  @Query('me')
  async readMe(@Me() me: User): Promise<User> {
    return me;
  }
}
