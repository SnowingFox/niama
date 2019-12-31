import * as Api from '@niama/api/types';
import { Maybe } from '@niama/core/types';

import { BootP, Role, Signin, SigninDto, Signup, SignupDto } from './';
import * as S from './service';

// NAMES ===================================================================================================================================

export type GrantNames = 'canDelete' | 'canRead' | 'canUpdate' | 'canUpdateStatus';

// PROVIDER ================================================================================================================================

export interface InitProviderP extends BootP {
  api: Api.Provider;
}

export interface Provider extends ProviderO {
  refreshSession: () => any;
  // current: Current<C['CurrentDto'], C['Role']>;
  changePassword$<Done, Fail>(p: S.ChangePasswordP<Done, Fail>): S.ChangePasswordR<Done, Fail>;
  //deleteCurrent$?: (p: S.DeleteCurrentP) => Observable;
  getCurrent$<Done, Fail>(p: S.GetCurrentP<Done, Fail>): S.GetCurrentR<Done, Fail>;
  getInfo(): Promise<Maybe<Info>>;
  getRefreshedTokens$<Done, Fail>(p: any): any;
  //refresh$: (p: S.RefreshP) => Observable;
  resetPassword$<Done, Fail>(p: S.ResetPasswordP<Done, Fail>): S.ResetPasswordR<Done, Fail>;
  //sendEmailResetCode$?: (p: S.SendEmailResetCodeP) => Observable;
  sendEmailVerification$<Done, Fail>(p: S.SendEmailVerificationP<Done, Fail>): S.SendEmailVerificationR<Done, Fail>;
  sendPasswordReset$<Done, Fail>(p: S.SendPasswordResetP<Done, Fail>): S.SendPasswordResetR<Done, Fail>;
  //signedInRoute?: string;
  //signedOutRoute?: string;
  signin$<Done, Fail>(p: S.SigninP<Done, Fail>): S.SigninR<Done, Fail>;
  signout$<Done, Fail>(p: S.SignoutP<Done, Fail>): S.SignoutR<Done, Fail>;
  signup$<Done, Fail>(p: S.SignupP<Done, Fail>): S.SignupR<Done, Fail>;
  verifyEmail$<Done, Fail>(p: S.VerifyEmailP<Done, Fail>): S.VerifyEmailR<Done, Fail>;
}

export interface ProviderO {
  signinToDto: (input: Signin) => SigninDto;
  signupToDto: (input: Signup) => SignupDto;
}

// OBJECTS =================================================================================================================================

export interface Info {
  id: string;
  role: Role;
  roles: Role[];
}

export type Status = 'BLOCKED' | 'INCORRECT' | 'OK' | 'PENDING';

// GRANTS ==================================================================================================================================

export type Caps<Role extends string = string> = Record<GrantNames, Role[]>;
export type Grant<Dto, Role extends string> = Role[] | ((dto: Dto) => Role[]);
export type Grants<Dto, Role extends string> = Record<GrantNames, Grant<Dto, Role>>;
