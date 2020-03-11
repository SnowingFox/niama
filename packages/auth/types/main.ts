import * as Api from '@niama/api/types';
import { Maybe, Syncer } from '@niama/core/types';
import { AsyncSubject } from 'rxjs';

import { BootAuthO, Payload, Service } from './';
import * as S from './service';

// BOOT ====================================================================================================================================

export interface BootAuthP {
  initProvider: (opts: BootAuthO) => Provider;
  opts: BootAuthO;
}

// PROVIDER ================================================================================================================================

export interface Provider {
  service: ServiceConfig;
  opts: BootAuthO;
  // refreshSession: () => any;
  // current: Current<C['CurrentDto'], C['Role']>;
  changePassword: <Done, Fail>(p: S.ChangePasswordC<Done, Fail>['P']) => S.ChangePasswordC<Done, Fail>['R'];
  confirmSignup: <Done, Fail>(p: S.ConfirmSignupC<Done, Fail>['P']) => S.ConfirmSignupC<Done, Fail>['R'];
  //deleteCurrent$?: (p: S.DeleteCurrentP) => Observable;
  fetch: () => Promise<Maybe<Payload>>;
  fromPayload: (p: Maybe<Payload>) => Po;
  //getCurrent$<Done, Fail>(p: S.GetCurrentP<Done, Fail>): S.GetCurrentR<Done, Fail>;
  //getRefreshedTokens$<Done, Fail>(p: any): any;
  //refresh$: (p: S.RefreshP) => Observable;

  resetPassword: <Done, Fail>(p: S.ResetPasswordC<Done, Fail>['P']) => S.ResetPasswordC<Done, Fail>['R'];
  //sendEmailResetCode$?: (p: S.SendEmailResetCodeP) => Observable;
  sendConfirmSignup: <Done, Fail>(p: S.SendConfirmSignupC<Done, Fail>['P']) => S.SendConfirmSignupC<Done, Fail>['R'];
  sendResetPassword: <Done, Fail>(p: S.SendResetPasswordC<Done, Fail>['P']) => S.SendResetPasswordC<Done, Fail>['R'];
  sendVerifyEmail: <Done, Fail>(p: S.SendVerifyEmailC<Done, Fail>['P']) => S.SendVerifyEmailC<Done, Fail>['R'];
  signin: <Done, Fail>(p: S.SigninC<Done, Fail>['P']) => S.SigninC<Done, Fail>['R'];
  signout: <Done, Fail>(p: S.SignoutC<Done, Fail>['P']) => S.SignoutC<Done, Fail>['R'];
  signup: <Done, Fail>(p: S.SignupC<Done, Fail>['P']) => S.SignupC<Done, Fail>['R'];
  verifyEmail: <Done, Fail>(p: S.VerifyEmailC<Done, Fail>['P']) => S.VerifyEmailC<Done, Fail>['R'];
}

export interface ServiceConfig {
  $: AsyncSubject<Service>;
  loading: boolean;
}

// REPO ====================================================================================================================================

export type Rp = Api.Rp<Labels, Ops>;

// OPS =====================================================================================================================================

export type OpK = 'read';
export type Ops = Record<OpK, Api.DocumentNode>;

// FIELDS ==================================================================================================================================

export type SF = K[];
export type F = SF;

export type K = keyof Po;

// LABELS ==================================================================================================================================

export type Labels = Record<OpK, string>;

// OBJECTS =================================================================================================================================

export interface Po extends Omit<Api.Po, 'id'> {
  accessToken: Maybe<string>;
  role: Role;
  roles: Role[];
}

export interface AuthorizationHeader {
  Authorization: string;
}

// KEYS ====================================================================================================================================

export type GrantK = 'canDelete' | 'canRead' | 'canUpdate' | 'canUpdateStatus';

// CONSTANTS ===============================================================================================================================

export type Role = 'MEMBER' | 'PUBLIC';
export type Status = 'BLOCKED' | 'INCORRECT' | 'OK' | 'PENDING';

// GRANTS ==================================================================================================================================

export type Caps = Record<GrantK, Role[]>;
export type Grant<Po> = Role[] | Syncer<Role[], Po>;
export type Grants<Po> = Record<GrantK, Grant<Po>>;
