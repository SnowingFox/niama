import { Observable, Observabler, SagaO, UseSagaReturnsO } from '@niama/core/types';

import { Signin, Signup } from './';
import * as O from './objects';

// CHANGE PASSWORD =========================================================================================================================

export type ChangePasswordO<Done, Fail> = SagaO<Done, any, Fail>;

export interface ChangePasswordP<Done, Fail> extends ChangePasswordO<Done, Fail> {
  input: Omit<O.ChangePassword, 'confirmation'>;
}

export type ChangePasswordR<Done, Fail> = Observable<Done | Fail>;

export interface UseChangePasswordP<Done, Fail> extends UseSagaReturnsO, ChangePasswordO<Done, Fail> {}
export interface UseChangePassworR<Done, Fail> extends Observabler<Done | Fail, Omit<O.ChangePassword, 'confirmation'>> {}

// GET CURRENT =============================================================================================================================

export type GetCurrentO<Done, Fail> = SagaO<Done, any, Fail>;

export interface GetCurrentP<Done, Fail> extends GetCurrentO<Done, Fail> {
  skipCache?: boolean;
}

export type GetCurrentR<Done, Fail> = Observable<Done | Fail>;

export interface UseGetCurrentP<Done, Fail> extends UseSagaReturnsO, GetCurrentO<Done, Fail> {}
export interface UseGetCurrentR<Done, Fail> extends Observabler<Done | Fail, any> {}

// RESET PASSWORD ==========================================================================================================================

export type ResetPasswordO<Done, Fail> = SagaO<Done, any, Fail>;

export interface ResetPasswordP<Done, Fail> extends ResetPasswordO<Done, Fail> {
  input: O.ResetPassword;
}

export type ResetPasswordR<Done, Fail> = Observable<Done | Fail>;

export interface UseResetPasswordP<Done, Fail> extends UseSagaReturnsO, ResetPasswordO<Done, Fail> {}
export interface UseResetPasswordR<Done, Fail> extends Observabler<Done | Fail, any> {}

// SEND EMAIL VERIFICATION =================================================================================================================

export type SendEmailVerificationO<Done, Fail> = SagaO<Done, any, Fail>;

export interface SendEmailVerificationP<Done, Fail> extends SendEmailVerificationO<Done, Fail> {
  input: O.SendEmailVerificationInput;
}

export type SendEmailVerificationR<Done, Fail> = Observable<Done | Fail>;

export interface UseSendEmailVerificationP<Done, Fail> extends UseSagaReturnsO, SendEmailVerificationO<Done, Fail> {}
export interface UseSendEmailVerificationR<Done, Fail> extends Observabler<Done | Fail, any> {}

// SEND PASSWORD RESET =====================================================================================================================

export type SendPasswordResetO<Done, Fail> = SagaO<Done, any, Fail>;

export interface SendPasswordResetP<Done, Fail> extends SendPasswordResetO<Done, Fail> {
  input: O.SendPasswordResetInput;
}

export type SendPasswordResetR<Done, Fail> = Observable<Done | Fail>;

export interface UseSendPasswordResetP<Done, Fail> extends UseSagaReturnsO, SendPasswordResetO<Done, Fail> {}
export interface UseSendPasswordResetR<Done, Fail> extends Observabler<Done | Fail, any> {}

// SIGNIN ==================================================================================================================================

export type SigninO<Done, Fail> = SagaO<Done, any, Fail>;

export interface SigninP<Done, Fail> extends SigninO<Done, Fail> {
  input: Signin;
}

export type SigninR<Done, Fail> = Observable<Done | Fail>;

export interface UseSigninP<Done, Fail> extends UseSagaReturnsO, SigninO<Done, Fail> {}
export interface UseSigninR<Done, Fail> extends Observabler<Done | Fail, Signin> {}

// SIGNOUT ==================================================================================================================================

export type SignoutO<Done, Fail> = SagaO<Done, void, Fail>;

export interface SignoutP<Done, Fail> extends SignoutO<Done, Fail> {}

export type SignoutR<Done, Fail> = Observable<Done | Fail>;

export interface UseSignoutP<Done, Fail> extends UseSagaReturnsO, SignoutO<Done, Fail> {}
export interface UseSignoutR<Done, Fail> extends Observabler<Done | Fail, void> {}

// SIGNUP ==================================================================================================================================

export type SignupO<Done, Fail> = SagaO<Done, string, Fail>;

export interface SignupP<Done, Fail> extends SignupO<Done, Fail> {
  input: Signup;
}

export type SignupR<Done, Fail> = Observable<Done | Fail>;

export interface UseSignupP<Done, Fail> extends UseSagaReturnsO, SignupO<Done, Fail> {}
export interface UseSignupR<Done, Fail> extends Observabler<Done | Fail, Signup> {}

// VERIFY EMAIL ============================================================================================================================

export type VerifyEmailO<Done, Fail> = SagaO<Done, void, Fail>;

export interface VerifyEmailP<Done, Fail> extends VerifyEmailO<Done, Fail> {
  input: string;
}

export type VerifyEmailR<Done, Fail> = Observable<Done | Fail>;

export interface UseVerifyEmailP<Done, Fail> extends UseSagaReturnsO, VerifyEmailO<Done, Fail> {}
export interface UseVerifyEmailR<Done, Fail> extends Observabler<Done | Fail, string> {}

/*export type DeleteCurrentP = ServiceP<'auth' | 'router'>;

export interface RefreshP<Result = any, Source = any> extends GetCurrentP {
  $niama: Pick<Niama, 'auth' | 'router'>;
  navigate?: string;
  resetApi?: boolean;
  switcher?: Observabler<Result, Source>;
}

export type SendEmailResetCodeP = ServiceP;



export interface UpdateAttrsP<Attrs extends object> extends ServiceP<'auth' | 'router'> {
  attrs: Attrs;
}*/
