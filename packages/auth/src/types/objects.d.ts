import { Maybe } from '@niama/core/types';

// NAMES ===================================================================================================================================

export type ChangePasswordNames = 'confirmation' | 'newValue' | 'oldValue';
export type ResetPasswordNames = 'password' | 'token' | 'username';
export type SendCodeNames = 'username';
export type SendVerifyEmailNames = 'email' | 'username';
export type SendResetPasswordNames = 'email' | 'username';

// OBJECTS =================================================================================================================================

export type ChangePassword = Record<ChangePasswordNames, string>;
export type ChangePasswordDto = ChangePassword;

export interface ConfirmSignup {
  password: string;
  token: string;
  username: string;
}
export type ConfirmSignupDto = ConfirmSignup;

export interface Current<Dto = any, Role extends string = string> {
  dto: Maybe<Dto>;
  id: Maybe<string>;
  roles: Role[];
}

export type ResetPassword = Record<ResetPasswordNames, string>;
export type ResetPasswordDto = ResetPassword;

export type SendVerifyEmail = Record<SendVerifyEmailNames, string>;
export type SendResetPassword = Record<SendResetPasswordNames, string>;

export type SendCode = Record<SendCodeNames, string>;
export type SendCodeDto = SendCode;
