import { Maybe } from '@niama/core/types';

// NAMES ===================================================================================================================================

export type ChangePasswordNames = 'confirmation' | 'newValue' | 'oldValue';
export type ConfirmSignupNames = 'code' | 'password' | 'username';
export type ResetPasswordNames = 'code' | 'password' | 'username';
export type SendCodeNames = 'username';
export type SigninNames = 'password' | 'username';
export type SignupNames = 'password' | 'username';

// OBJECTS =================================================================================================================================

export type ChangePassword = Record<ChangePasswordNames, string>;
export type ChangePasswordDto = ChangePassword;

export type ConfirmSignup = Record<ConfirmSignupNames, string>;
export type ConfirmSignupDto = ConfirmSignup;

export interface Current<Dto = any, Role extends string = string> {
  dto: Maybe<Dto>;
  id: Maybe<string>;
  roles: Role[];
}

export type ResetPassword = Record<ResetPasswordNames, string>;
export type ResetPasswordDto = ResetPassword;

export type SendCode = Record<SendCodeNames, string>;
export type SendCodeDto = SendCode;

export type Signin = Record<SigninNames, string>;
export type SigninDto = Signin;

export type Signup = Record<SignupNames, string>;
export type SignupDto = Signup;
