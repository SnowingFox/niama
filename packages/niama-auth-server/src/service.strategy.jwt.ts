/* import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User as UserB } from '@niama/user';
import { UserS } from '@niama/user/back';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthCookieS } from './b.auth.service.cookie';

@Injectable()
export class AuthJwtSTG<Role extends string, User extends UserB<Role>> extends PassportStrategy(Strategy, 'jwt') {
  // LIFECYCLE =============================================================================================================================

  constructor(protected cookieS: AuthCookieS<Role, User>, protected userS: UserS<Role, User>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: N.Request): string => this.cookieS.getJWT(req)]),
      secretOrKey: process.env.AUTH_SECRET,
    });
  }

  // OVERRIDE ==============================================================================================================================

  async validate({ id, roles }: N.AuthToken<Role>): Promise<User> {
    const user: N.Maybe<User> = await this.userS.readResource({ id });
    if (user && user.checkRoles(roles)) return user;
    throw new UnauthorizedException();
  }
}
 */