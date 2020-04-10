import { AuthClass } from 'aws-amplify';

export interface PayloadAttrsAddress {
  address: string;
  'custom:addressCoords': string;
  'custom:addressData1': string;
  'custom:addressData2': string;
  'custom:addressData3': string;
  'custom:addressId': string;
  'custom:addressTypes': string;
}

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

  interface Raw extends AuthClass {}

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

export * from '@niama/auth/types';
export * from './externals';
