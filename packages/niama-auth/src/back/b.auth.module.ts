import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthCT } from './b.auth.controller';
import { AuthCookieS } from './b.auth.service.cookie';
import { AuthRS } from './b.auth.service.resolver';
import { AuthJwtSTG } from './b.auth.service.strategy.jwt';
import { AuthLocalSTG } from './b.auth.service.strategy.local';

@Global()
@Module({
  controllers: [AuthCT],
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: {
        audience: process.env.AUTH_AUDIENCE,
        expiresIn: 24 * 60 * 60,
        issuer: process.env.AUTH_ISSUER,
      },
    }),
  ],
  providers: [AuthCookieS, AuthJwtSTG, AuthLocalSTG, AuthRS],
})
export class AuthMD {}
