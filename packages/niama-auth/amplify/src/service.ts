import { pick, request$ as baseRequest$, requestError$, requestSuccess$ } from '@niama/core';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { refresh$ as baseRefresh$, signupToDto } from '../../src/service';
import * as T from './types';

// EXTERNALS ===============================================================================================================================

export { signupToDto };

// MAIN ====================================================================================================================================

export async function getCurrent<C extends T.Config>(p?: T.GetCurrentP): Promise<T.Current> {
  const dto: T.Maybe<C['CurrentDto']> = await getCurrentDto(p || { skipCache: false });
  return { dto, id: getCurrentId(dto), roles: getCurrentRoles(dto) };
}

export function getCurrentId<C extends T.Config>(dto: T.Maybe<C['CurrentDto']>): T.Maybe<string> {
  return dto ? dto.attributes.sub : null;
}

export async function getCurrentDto<C extends T.Config>({ skipCache = false }: T.GetCurrentP): Promise<T.Maybe<C['CurrentDto']>> {
  try {
    return await Auth.currentAuthenticatedUser({ bypassCache: skipCache });
  } catch (err) {
    if (process.env.DEV) console.error(err);
    return null;
  }
}

export function getCurrentRoles<C extends T.Config>(dto: T.Maybe<C['CurrentDto']>): C['Role'][] {
  return [];
}

// PROMISES ================================================================================================================================

export const getCurrentIdToken = ({ $niama }: { $niama: Pick<T.NiamaProvider, 'auth'> }): T.Maybe<string> => {
  if (!$niama.auth.current.dto) return null;
  return $niama.auth.current.dto
    .getSignInUserSession()!
    .getIdToken()
    .getJwtToken();
};
// OBSERVABLES =============================================================================================================================

function request$<R, S>(p: T.RequestP<R, S>): T.Observable<R> {
  return baseRequest$({
    ...p,
    error$: (err) => throwError(new Error(`amplify.${err['code']}`)).pipe(catchError(requestError$(p))),
  });
}

export const changePassword$ = ({ $niama, data, ...opts }: T.ChangePasswordP): T.Observable =>
  request$({ request: () => Auth.changePassword($niama.auth.current.dto, data.oldValue, data.newValue), ...opts });

export const confirmSignup$ = ({ $niama, data, ...opts }: T.ConfirmSignupP): T.Observable =>
  request$({
    request: () => Auth.confirmSignUp(data.username, data.code, { forceAliasCreation: false }),
    error$: requestError$(opts),
    success$: () => signin$({ $niama, data: pick(data, ['password', 'username']) }).pipe(switchMap(requestSuccess$(opts))),
  });

export const deleteCurrent$ = ({ $niama, ...opts }: T.DeleteCurrentP): T.Observable =>
  request$({
    request: () => new Promise((r) => $niama.auth.current.dto.deleteUser(r)),
    error$: requestError$(opts),
    success$: () => refresh$({ $niama, navigate: $niama.auth.signedOutRoute, resetApi: true, switcher: requestSuccess$(opts) }),
  });

export const refresh$ = ({ $niama, switcher = (s) => of(s), ...p }: T.RefreshP): T.Observable =>
  baseRefresh$({
    $niama,
    ...p,
    switcher: (s) => {
      const token = getCurrentIdToken({ $niama });
      if (!token) return switcher(s);
      return request$({
        request: () => axios.get('/auth/register', { headers: { Authorization: `Bearer ${token}` } }),
        error$: () => throwError({ code: 'NotAuthorizedException' }),
        success$: switcher,
      });
    },
  });

export const resetPassword$ = ({ $niama, data, ...opts }: T.ResetPasswordP): T.Observable =>
  request$({
    request: () => Auth.forgotPasswordSubmit(data.username, data.code, data.password),
    error$: requestError$(opts),
    success$: () => signin$({ $niama, data: pick(data, ['password', 'username']) }).pipe(switchMap(requestSuccess$(opts))),
  });

/*export const refresh$ = (p: T.RefreshP): T.Observable =>
  defer(() => getCurrent(p)).pipe(tap((current) => (p.$niama.auth.current = current)));*/

export const sendEmailResetCode$ = ({ $niama, ...opts }: T.SendEmailResetCodeP): T.Observable =>
  request$({ request: () => Auth.verifyCurrentUserAttribute('email'), ...opts });

export const sendPasswordResetCode$ = ({ $niama, data, ...opts }: T.SendPasswordResetCodeP): T.Observable =>
  request$({ request: () => Auth.forgotPassword(data.username), ...opts });

export const sendSignupCode$ = ({ $niama, data, ...opts }: T.SendSignupCodeP): T.Observable =>
  request$({ request: () => Auth.resendSignUp(data.username), ...opts });

export const signin$ = ({ $niama, data, ...opts }: T.SigninP): T.Observable =>
  request$({
    request: () => Auth.signIn(data.username, data.password),
    error$: requestError$(opts),
    success$: () => refresh$({ $niama, navigate: $niama.auth.signedInRoute, resetApi: true, switcher: requestSuccess$(opts) }),
  });

export const signout$ = ({ $niama, ...opts }: T.SignoutP): T.Observable =>
  request$({
    request: () => Auth.signOut(),
    error$: requestError$(opts),
    success$: () => refresh$({ $niama, navigate: $niama.auth.signedOutRoute, resetApi: true, switcher: requestSuccess$(opts) }),
  });

export function signup$<Attrs extends object>({ $niama, data, ...opts }: T.SignupP): T.Observable {
  return request$({ request: () => Auth.signUp($niama.auth.signupToDto!(data)), ...opts });
}

/*export function updateCurrent$<Attrs extends object>({ $niama, data, ...opts }: T.UpdateCurrentP<Attrs>): T.Observable {
  return request$({
    request: () => Auth.updateUserAttributes($niama.auth.current.raw, attrs),
    error$: requestError$(opts),
    success$: () => refresh$({ $niama, skipCache: true }).pipe(switchMap(requestSuccess$(opts))),
  });
}*/

export function updateAttrs$<Attrs extends object>({ $niama, attrs, ...opts }: T.UpdateAttrsP<Attrs>): T.Observable {
  return request$({
    request: () => Auth.updateUserAttributes($niama.auth.current.dto, attrs),
    error$: requestError$(opts),
    success$: () => refresh$({ $niama, skipCache: true }).pipe(switchMap(requestSuccess$(opts))),
  });
}

export const verifyEmail$ = ({ $niama, code, ...opts }: T.VerifyEmailP): T.Observable =>
  request$({
    request: () => Auth.verifyCurrentUserAttributeSubmit('email', code),
    error$: requestError$(opts),
    success$: () => refresh$({ $niama, skipCache: true }).pipe(switchMap(requestSuccess$(opts))),
  });

export const allServices = {
  changePassword$,
  confirmSignup$,
  deleteCurrent$,
  getCurrent,
  refresh$,
  resetPassword$,
  sendEmailResetCode$,
  sendPasswordResetCode$,
  sendSignupCode$,
  signin$,
  signout$,
  signup$,
  signupToDto,
};
