import { Observabler, RawLocation, VueRouter } from '@niama/core/types';

import { Provider } from './src/types/boot';
import { Po } from './src/types/main';

export * from './src/types';

declare module '@niama/core/types' {
  interface Niama {
    auth: Provider;
  }
}

declare module '@niama/auth/types' {
  interface BootO {
    authenticatedRoute?: RawLocation;
    refresh?: Observabler<any, Po>;
    router: VueRouter;
    signinToDto: (input: Signin) => SigninDto;
    signupToDto: (input: Signup) => SignupDto;
    unauthenticatedRoute?: RawLocation;
  }

  interface Payload {}
  interface Raw {}
  interface SendConfirmSignup {}

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
