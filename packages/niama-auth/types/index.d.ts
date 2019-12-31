import { ProviderO } from './main';
import { SigninNames, SignupNames } from './objects';

declare module '@niama/auth/types' {
  interface BootP extends ProviderO {}
  
  enum Role {
    MEMBER = 'MEMBER',
    PUBLIC = 'PUBLIC',
  }
  
  interface Signin extends Record<SigninNames, string> {}
  interface SigninDto extends Record<SigninNames, string> {}
  interface Signup extends Record<SignupNames, string> {}
  interface SignupDto extends Record<SignupNames, string> {}
  
  interface TokenPayload {
    data: unknown;
    exp: string;
    iat: string;
  }
}

export * from './core';
export * from './main';
export * from './objects';
export * from './service';
