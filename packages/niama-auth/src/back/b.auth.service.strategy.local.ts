import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User as UserB } from '@niama/user';
import { UserS } from '@niama/user/back';
import { Strategy } from 'passport-local';

@Injectable()
export class AuthLocalSTG<Role extends string, User extends UserB<Role>> extends PassportStrategy(Strategy, 'local') {
  // LIFECYCLE =============================================================================================================================

  constructor(protected userS: UserS<Role, User>) {
    super();
  }

  // OVERRIDE ==============================================================================================================================

  async validate(username: string, password: string): Promise<User> {
    const user: N.Maybe<User> = await this.userS.readResource({ username });
    if (user && user.canSignin && (await user.checkPassword(password))) return user;
    throw new UnauthorizedException();
  }
}
