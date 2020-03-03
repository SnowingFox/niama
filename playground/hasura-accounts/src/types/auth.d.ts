import * as Auth from '@niama/auth/types';

export * from '@niama/auth/types';
export * from '@niama/auth-server/types';

declare module '@niama/auth/types' {
  interface Signin {
    email: string;
    password: string;
  }

  interface SigninDto {
    password: string;
    user: {
      email: string;
    };
  }

  interface Signup {
    email: string;
    firstname: string;
    lastname: string;
    roles: Role[];
  }

  interface SignupDto {
    email: string;
    profile: {
      firstname: string;
      lastname: string;
    };
    roles: Role[];
  }
}

export type Role = Auth.Role | 'ADMIN';