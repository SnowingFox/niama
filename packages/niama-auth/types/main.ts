import { Observable, VueRouter } from '@niama/core/types';

import { Current, Signup, SignupDto } from './objects';
import * as S from './service';

// CONFIG ==================================================================================================================================

export interface Config<
  ICurrentDto = any,
  IRole extends string = string,
  ISignup extends Signup = Signup,
  ISignupDto extends SignupDto = SignupDto
> {
  CurrentDto: ICurrentDto;
  Role: IRole;
  Signup: ISignup;
  SignupDto: ISignupDto;
}

// NAMES ===================================================================================================================================

export type GrantNames = 'canDelete' | 'canRead' | 'canUpdate' | 'canUpdateStatus';

// BOOT ====================================================================================================================================

export interface BootP<C extends Config = Config> extends Partial<ProviderO<C>>, ProviderRequiredO<C> {
  router: VueRouter;
  Vue: any;
}

// PROVIDER ================================================================================================================================

export interface Provider<C extends Config = Config> extends ProviderO<C>, ProviderRequiredO<C> {
  current: Current<C['CurrentDto'], C['Role']>;
}

export interface ProviderRequiredO<C extends Config = Config> {
  getCurrent: (p?: S.GetCurrentP) => Promise<Current<C['CurrentDto'], C['Role']>>;
  refresh$: (p: S.RefreshP) => Observable;
  signin$: (p: S.SigninP) => Observable<boolean>;
  signout$: (p: S.SignoutP) => Observable<boolean>;
}

export interface ProviderO<C extends Config = Config> {
  changePassword$?: (p: S.ChangePasswordP) => Observable;
  deleteCurrent$?: (p: S.DeleteCurrentP) => Observable;
  confirmSignup$?: (p: S.ConfirmSignupP) => Observable;
  resetPassword$?: (p: S.ResetPasswordP) => Observable;
  sendEmailResetCode$?: (p: S.SendEmailResetCodeP) => Observable;
  sendPasswordResetCode$?: (p: S.SendPasswordResetCodeP) => Observable;
  sendSignupCode$?: (p: S.SendSignupCodeP) => Observable;
  signedInRoute: string;
  signedOutRoute: string;
  signup$?: (p: S.SignupP) => Observable;
  signupToDto?: (input: C['Signup']) => C['SignupDto'];
}

// OBJECTS =================================================================================================================================

export type Status = 'BLOCKED' | 'INCORRECT' | 'OK' | 'PENDING';

// GRANTS ==================================================================================================================================

export type Caps<Role extends string = string> = Record<GrantNames, Role[]>;
export type Grant<Dto, Role extends string> = Role[] | ((dto: Dto) => Role[]);
export type Grants<Dto, Role extends string> = Record<GrantNames, Grant<Dto, Role>>;
