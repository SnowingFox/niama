import { Auth } from 'aws-amplify';

export * from './src/types';

declare module '@niama/auth/types' {
  interface BootO {
    config: any;
  }

  interface Payload {
    attributes: PayloadAttrs;
    signInUserSession: {
      accessToken: { jwtToken: string };
      idToken: { jwtToken: string };
      refreshToken: { token: string };
    };
    username: string;
  }

  interface Raw extends Required<typeof Auth> {}

  interface SendConfirmSignup {
    username: string;
  }

  interface Signin {
    username: string;
  }

  interface SigninDto {
    username: string;
  }

  interface Signup {
    username: string;
  }

  interface SignupDto {
    attributes: SignupDtoAttrs;
    username: string;
  }
}

declare module '@niama/auth-amplify/types' {
  interface PayloadAttrs {
    email: string;
    email_verified: boolean;
    sub: string;
  }

  interface SignupDtoAttrs extends Omit<PayloadAttrs, 'email_verified' | 'sub'> {}
}