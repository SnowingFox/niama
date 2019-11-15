import { NiamaProvider, NiamaProviderNames, Observabler, RequestO } from '@niama/core/types';

import { Config } from './main';
import * as E from './objects';

// MAIN PARAMS =============================================================================================================================

export interface GetCurrentP {
  skipCache?: boolean;
}

// SERVICE BASE ============================================================================================================================

export interface ServiceP<Props extends NiamaProviderNames = 'auth', Result = any, Source = any> extends RequestO<Result, Source> {
  $niama: Pick<NiamaProvider, Props>;
}

// SERVICE PARAMS ==========================================================================================================================

export interface ChangePasswordP extends ServiceP {
  data: Omit<E.ChangePassword, 'confirmation'>;
}

export interface ConfirmSignupP extends ServiceP<'api' | 'auth' | 'router'> {
  data: E.ConfirmSignup;
}

export type DeleteCurrentP = ServiceP<'api' | 'auth' | 'router'>;

export interface RefreshP<Result = any, Source = any> extends GetCurrentP {
  $niama: Pick<NiamaProvider, 'api' | 'auth' | 'router'>;
  navigate?: string;
  resetApi?: boolean;
  switcher?: Observabler<Result, Source>;
}

export interface ResetPasswordP extends ServiceP<'api' | 'auth' | 'router'> {
  data: E.ResetPassword;
}

export type SendEmailResetCodeP = ServiceP;

export interface SendPasswordResetCodeP extends ServiceP {
  data: E.SendCode;
}

export interface SendSignupCodeP extends ServiceP {
  data: E.SendCode;
}

export interface SigninP extends ServiceP<'api' | 'auth' | 'router'> {
  data: E.Signin;
}

export type SignoutP = ServiceP<'api' | 'auth' | 'router'>;

export interface SignupP<C extends Config = Config> extends ServiceP<'api' | 'auth'> {
  data: C['Signup'];
}

export interface UpdateAttrsP<Attrs extends object> extends ServiceP<'api' | 'auth' | 'router'> {
  attrs: Attrs;
}

export interface VerifyEmailP extends ServiceP<'api' | 'auth' | 'router'> {
  code: string;
}
