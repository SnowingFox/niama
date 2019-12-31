import { Maybe } from '@niama/core/types';

// NAMES ===================================================================================================================================

export type ChangePasswordNames = 'confirmation' | 'newValue' | 'oldValue';
export type ConfirmSignupNames = 'password' | 'token' | 'username';
export type ResetPasswordNames = 'password' | 'token' | 'username';
export type SendCodeNames = 'username';
export type SendEmailVerificationInputNames = 'email' | 'username';
export type SendPasswordResetInputNames = 'email' | 'username';
export type SigninNames = 'password';
export type SignupNames = 'password';

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

export type SendEmailVerificationInput = Record<SendEmailVerificationInputNames, string>;
export type SendPasswordResetInput = Record<SendPasswordResetInputNames, string>;

export type SendCode = Record<SendCodeNames, string>;
export type SendCodeDto = SendCode;
