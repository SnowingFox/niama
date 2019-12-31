import { pick, saga$ as baseRequest$, sagaDone$, sagaFail$ } from '@niama/core';
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

function saga$<R, S>(p: T.RequestP<R, S>): T.Observable<R> {
  return baseRequest$({
    ...p,
    fail$: (err) => throwError(new Error(`amplify.${err['code']}`)).pipe(catchError(sagaFail$(p))),
  });
}

export const changePassword$ = ({ $niama, data, ...opts }: T.ChangePasswordP): T.Observable =>
  saga$({ saga: () => Auth.changePassword($niama.auth.current.dto, data.oldValue, data.newValue), ...opts });

export const confirmSignup$ = ({ $niama, data, ...opts }: T.ConfirmSignupP): T.Observable =>
  saga$({
    saga: () => Auth.confirmSignUp(data.username, data.code, { forceAliasCreation: false }),
    fail$: sagaFail$(opts),
    done$: () => signin$({ $niama, data: pick(data, ['password', 'username']) }).pipe(switchMap(sagaDone$(opts))),
  });

export const deleteCurrent$ = ({ $niama, ...opts }: T.DeleteCurrentP): T.Observable =>
  saga$({
    saga: () => new Promise((r) => $niama.auth.current.dto.deleteUser(r)),
    fail$: sagaFail$(opts),
    done$: () => refresh$({ $niama, navigate: $niama.auth.signedOutRoute, resetApi: true, switcher: sagaDone$(opts) }),
  });

export const refresh$ = ({ $niama, switcher = (s) => of(s), ...p }: T.RefreshP): T.Observable =>
  baseRefresh$({
    $niama,
    ...p,
    switcher: (s) => {
      const token = getCurrentIdToken({ $niama });
      if (!token) return switcher(s);
      return saga$({
        saga: () => axios.get('/auth/register', { headers: { Authorization: `Bearer ${token}` } }),
        fail$: () => throwError({ code: 'NotAuthorizedException' }),
        done$: switcher,
      });
    },
  });

export const resetPassword$ = ({ $niama, data, ...opts }: T.ResetPasswordP): T.Observable =>
  saga$({
    saga: () => Auth.forgotPasswordSubmit(data.username, data.code, data.password),
    fail$: sagaFail$(opts),
    done$: () => signin$({ $niama, data: pick(data, ['password', 'username']) }).pipe(switchMap(sagaDone$(opts))),
  });

/*export const refresh$ = (p: T.RefreshP): T.Observable =>
  defer(() => getCurrent(p)).pipe(tap((current) => (p.$niama.auth.current = current)));*/

export const sendEmailResetCode$ = ({ $niama, ...opts }: T.SendEmailResetCodeP): T.Observable =>
  saga$({ saga: () => Auth.verifyCurrentUserAttribute('email'), ...opts });

export const sendPasswordResetCode$ = ({ $niama, data, ...opts }: T.SendPasswordResetCodeP): T.Observable =>
  saga$({ saga: () => Auth.forgotPassword(data.username), ...opts });

export const sendSignupCode$ = ({ $niama, data, ...opts }: T.SendSignupCodeP): T.Observable =>
  saga$({ saga: () => Auth.resendSignUp(data.username), ...opts });

export const signin$ = ({ $niama, data, ...opts }: T.SigninP): T.Observable =>
  saga$({
    saga: () => Auth.signIn(data.username, data.password),
    fail$: sagaFail$(opts),
    done$: () => refresh$({ $niama, navigate: $niama.auth.signedInRoute, resetApi: true, switcher: sagaDone$(opts) }),
  });

export const signout$ = ({ $niama, ...opts }: T.SignoutP): T.Observable =>
  saga$({
    saga: () => Auth.signOut(),
    fail$: sagaFail$(opts),
    done$: () => refresh$({ $niama, navigate: $niama.auth.signedOutRoute, resetApi: true, switcher: sagaDone$(opts) }),
  });

export function signup$<Attrs extends object>({ $niama, data, ...opts }: T.SignupP): T.Observable {
  return saga$({ saga: () => Auth.signUp($niama.auth.signupToDto!(data)), ...opts });
}

/*export function updateCurrent$<Attrs extends object>({ $niama, data, ...opts }: T.UpdateCurrentP<Attrs>): T.Observable {
  return saga$({
    saga: () => Auth.updateUserAttributes($niama.auth.current.raw, attrs),
    fail$: sagaFail$(opts),
    done$: () => refresh$({ $niama, skipCache: true }).pipe(switchMap(sagaDone$(opts))),
  });
}*/

export function updateAttrs$<Attrs extends object>({ $niama, attrs, ...opts }: T.UpdateAttrsP<Attrs>): T.Observable {
  return saga$({
    saga: () => Auth.updateUserAttributes($niama.auth.current.dto, attrs),
    fail$: sagaFail$(opts),
    done$: () => refresh$({ $niama, skipCache: true }).pipe(switchMap(sagaDone$(opts))),
  });
}

export const verifyEmail$ = ({ $niama, code, ...opts }: T.VerifyEmailP): T.Observable =>
  saga$({
    saga: () => Auth.verifyCurrentUserAttributeSubmit('email', code),
    fail$: sagaFail$(opts),
    done$: () => refresh$({ $niama, skipCache: true }).pipe(switchMap(sagaDone$(opts))),
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
