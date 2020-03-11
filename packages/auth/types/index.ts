import { Observabler, RawLocation, VueRouter } from '@niama/core/types';

import { Po } from './main';

export * from './boot';
export * from './core';
export * from './main';
export * from './objects';
export * from './service';

declare module '@niama/auth/types' {
  export interface BootAuthO {
    authenticatedRoute?: RawLocation;
    refresh?: Observabler<any, Po>;
    router: VueRouter;
    signinToDto: (input: Signin) => SigninDto;
    signupToDto: (input: Signup) => SignupDto;
    unauthenticatedRoute?: RawLocation;
  }

  interface Payload {}

  interface SendConfirmSignup {}

  interface Service {}

  interface Signin {
    password: string;
  }

  interface SigninDto {
    password: string;
  }

  interface Signup {
    password: string;
  }

  interface SignupDto {
    password: string;
  }

  interface TokenPayload {
    data: unknown;
    exp: string;
    iat: string;
  }
}
