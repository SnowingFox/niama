import { Observable, Observabler, RawLocation, SagaCfg, SagaO, UseSagaReturnsO } from '@niama/core/types';

import { SendConfirmSignup, Signin, Signup } from './';
import { Po } from './main';
import * as O from './objects';

// CHANGE PASSWORD =========================================================================================================================

export type ChangePasswordC<Done = void, Fail = null> = SagaCfg<Omit<O.ChangePassword, 'confirmation'>, void, Done, Fail>;
export type UseChangePasswordP<Done = void, Fail = null> = ChangePasswordC<Done, Fail>['UseP'];
export type UseChangePasswordL$P<Done = void, Fail = null> = ChangePasswordC<Done, Fail>['L$P'];

// CONFIRM SIGNUP ==========================================================================================================================

export type ConfirmSignupC<Done = void, Fail = null> = SagaCfg<O.ConfirmSignup, Po, Done, Fail>;
export type UseConfirmSignupP<Done = void, Fail = null> = ConfirmSignupC<Done, Fail>['UseP'];
export type UseConfirmSignupL$P<Done = void, Fail = null> = ConfirmSignupC<Done, Fail>['L$P'];

// GET CURRENT =============================================================================================================================

export type GetCurrentO<Done, Fail> = SagaO<Done, any, Fail>;

export interface GetCurrentP<Done, Fail> extends GetCurrentO<Done, Fail> {
  skipCache?: boolean;
}

export type GetCurrentR<Done, Fail> = Observable<Done | Fail>;

export interface UseGetCurrentP<Done, Fail> extends UseSagaReturnsO<any>, GetCurrentO<Done, Fail> {}
export interface UseGetCurrentR<Done, Fail> extends Observabler<Done | Fail, any> {}

// REFRESHER ===============================================================================================================================

export interface Refresh$P<Done> {
  redirect?: RawLocation;
  switcher?: Observabler<Done, Po>;
}

// RESET PASSWORD ==========================================================================================================================

export type ResetPasswordC<Done = void, Fail = null> = SagaCfg<O.ResetPassword, any, Done, Fail>;
export type UseResetPasswordP<Done = void, Fail = null> = ResetPasswordC<Done, Fail>['UseP'];
export type UseResetPasswordL$P<Done = void, Fail = null> = ResetPasswordC<Done, Fail>['L$P'];

// SEND CONFIRM SIGNUP =====================================================================================================================

export type SendConfirmSignupC<Done = void, Fail = null> = SagaCfg<SendConfirmSignup, void, Done, Fail>;
export type UseSendConfirmSignupP<Done = void, Fail = null> = SendConfirmSignupC<Done, Fail>['UseP'];
export type UseSendConfirmSignupL$P<Done = void, Fail = null> = SendConfirmSignupC<Done, Fail>['L$P'];

// SEND RESET PASSWORD =====================================================================================================================

export type SendResetPasswordC<Done = void, Fail = null> = SagaCfg<O.SendResetPassword, any, Done, Fail>;
export type UseSendResetPasswordP<Done = void, Fail = null> = SendResetPasswordC<Done, Fail>['UseP'];
export type UseSendResetPasswordL$P<Done = void, Fail = null> = SendResetPasswordC<Done, Fail>['L$P'];

// SEND VERIFY EMAIL =======================================================================================================================

export type SendVerifyEmailC<Done = void, Fail = null> = SagaCfg<O.SendVerifyEmail, any, Done, Fail>;
export type UseSendVerifyEmailP<Done = void, Fail = null> = SendVerifyEmailC<Done, Fail>['UseP'];
export type UseSendVerifyEmailL$P<Done = void, Fail = null> = SendVerifyEmailC<Done, Fail>['L$P'];

// SIGNIN ==================================================================================================================================

export type SigninC<Done = void, Fail = null> = SagaCfg<Signin, Po, Done, Fail>;
export type UseSigninP<Done = void, Fail = null> = SigninC<Done, Fail>['UseP'];
export type UseSigninL$P<Done = void, Fail = null> = SigninC<Done, Fail>['L$P'];

// SIGNOUT ==================================================================================================================================

export type SignoutC<Done = void, Fail = null> = SagaCfg<void, Po, Done, Fail>;
export type UseSignoutP<Done = void, Fail = null> = SignoutC<Done, Fail>['UseP'];
export type UseSignoutL$P<Done = void, Fail = null> = SignoutC<Done, Fail>['L$P'];

// SIGNUP ==================================================================================================================================

export type SignupC<Done = void, Fail = null> = SagaCfg<Signup, string, Done, Fail>;
export type UseSignupP<Done = void, Fail = null> = SignupC<Done, Fail>['UseP'];
export type UseSignupL$P<Done = void, Fail = null> = SignupC<Done, Fail>['L$P'];

// VERIFY EMAIL ============================================================================================================================

export type VerifyEmailC<Done = void, Fail = null> = SagaCfg<string, void, Done, Fail>;
export type UseVerifyEmailP<Done = void, Fail = null> = VerifyEmailC<Done, Fail>['UseP'];
export type UseVerifyEmailL$P<Done = void, Fail = null> = VerifyEmailC<Done, Fail>['L$P'];

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
