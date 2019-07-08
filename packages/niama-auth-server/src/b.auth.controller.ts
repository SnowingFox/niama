import { Body, Controller, Delete, HttpStatus, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthSignupI } from '@niama/auth';
import { Maybe } from '@niama/core';
import { User as UserB } from '@niama/user';
import { UserS } from '@niama/user/back';
import { UserBC } from '@niama/user/src/back/b.user.model.create';
import { Response } from 'express';

import { Me } from './b.auth.decorator.me';
import { AuthCookieS } from './b.auth.service.cookie';

@Controller('api')
export class AuthCT<Role extends string, User extends UserB<Role>> {
  // LIFECYCLE =============================================================================================================================

  constructor(protected authCookieS: AuthCookieS<Role, User>, protected userS: UserS<Role, User>) {}

  // POST ==================================================================================================================================

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  signIn(@Me() me: User, @Res() res: Response) {
    this.authCookieS.setFromMe(res, me);
    res.status(HttpStatus.OK).send();
  }

  @Post('signup')
  async signUp(@Body() dto: AuthSignupI, @Res() res: Response) {
    let result: Maybe<User> = await this.userS.readResource({ username: dto.email });
    if (!result) result = await this.userS.createFromSignup(await UserBC.fromSignup(dto));
    res.status(HttpStatus.OK).send({ result });
  }

  // DELETE ================================================================================================================================

  @Delete('signout')
  signOut(@Res() res: Response) {
    this.authCookieS.remove(res);
    res.status(HttpStatus.OK).send();
  }
}
