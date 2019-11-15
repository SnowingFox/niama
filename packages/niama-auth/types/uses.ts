import { Loadable, Observable, RequestO, Subject } from '@niama/core/types';

import * as E from './objects';

// BASE ====================================================================================================================================

export interface UseRequestR<Result = any, Source = any> extends Loadable<Result> {
  source$?: Subject<Source>;
}

export interface UseRequestP<Result = any, Source = any> extends RequestO<Result, Source> {
  source$?: Observable<Source>;
}

// RESULTS =================================================================================================================================

export interface UseChangePasswordR<Result = any, Source = any> extends UseRequestR<Result, Source> {
  input: E.ChangePassword;
}

export interface UseConfirmSignupR<Result = any, Source = any> extends UseRequestR<Result, Source> {
  input: E.ConfirmSignup;
}

export type UseDeleteCurrentR<Result = any, Source = any> = UseRequestR<Result, Source>;

export interface UseResetPasswordR<Result = any, Source = any> extends UseRequestR<Result, Source> {
  input: E.ResetPassword;
}

export type UseSendEmailResetCodeR<Result = any, Source = any> = UseRequestR<Result, Source>;

export interface UseSendPasswordResetCodeR<Result = any, Source = any> extends UseRequestR<Result, Source> {
  input: E.SendCode;
}

export interface UseSendSignupCodeR<Result = any, Source = any> extends UseRequestR<Result, Source> {
  input: E.SendCode;
}

export interface UseSigninR<Result = any, Source = any> extends UseRequestR<Result, Source> {
  input: E.Signin;
}

export type UseSignoutR<Result = any, Source = any> = UseRequestR<Result, Source>;

export interface UseSignupR<Result = any, Source = any> extends UseRequestR<Result, Source> {
  input: E.Signup;
}

// PARAMS ==================================================================================================================================

export interface UseChangePasswordP<Result = any, Source = any> extends UseRequestP<Result, Source> {
  input?: E.ChangePassword;
}

export interface UseConfirmSignupP<Result = any, Source = any> extends UseRequestP<Result, Source> {
  input?: E.ConfirmSignup;
}

export type UseDeleteCurrentP<Result = any, Source = any> = UseRequestP<Result, Source>;

export interface UseResetPasswordP<Result = any, Source = any> extends UseRequestP<Result, Source> {
  input?: E.ResetPassword;
}

export type UseSendEmailResetCodeP<Result = any, Source = any> = UseRequestP<Result, Source>;

export interface UseSendPasswordResetCodeP<Result = any, Source = any> extends UseRequestP<Result, Source> {
  input?: E.SendCode;
}

export interface UseSendSignupCodeP<Result = any, Source = any> extends UseRequestP<Result, Source> {
  input?: E.SendCode;
}

export interface UseSigninP<Result = any, Source = any> extends UseRequestP<Result, Source> {
  input?: E.Signin;
}

export type UseSignoutP<Result = any, Source = any> = UseRequestP<Result, Source>;

export interface UseSignupP<Result = any, Source = any> extends UseRequestP<Result, Source> {
  input?: E.Signup;
}
