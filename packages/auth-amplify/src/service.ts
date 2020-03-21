import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { getError, refresh$ } from '@niama/auth';
import { saga as baseSaga, sagaDone, sagaFail } from '@niama/core';
import { AsyncSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as T from './types';

const initService = ({ config }: T.BootAuthO): T.ServiceConfig => {
  const service = { loading: false, $: new AsyncSubject<T.Service>() };
  Amplify.configure(config);
  service.$.next(Auth);
  service.$.complete();
  return service;
};

export const initProvider = (opts: T.BootAuthO): T.Provider => {
  const { authenticatedRoute, signinToDto, signupToDto, unauthenticatedRoute } = opts;
  const service = initService(opts);

  type SagaP<D, R = D, S = void, F = null> = { act: ($: T.Service, ...src: [S]) => Promise<R> } & T.SagaO<D, R, F>;

  const saga = <D, R = D, S = void, F = null>({ act, ...sagaO }: SagaP<D, R, S, F>): T.Observabler<D | F, S> => {
    const mapError = (err: Error) => (err.name ? getError(`amplify.${err.name}`) : err);
    return (...src: [S]) => service.$.pipe(switchMap(baseSaga({ act: async ($) => act($, ...src), ...sagaO, mapError })));
  };

  const signin = <D, F = null>(p: T.SigninC<D, F>['P']): T.SigninC<D, F>['R'] =>
    saga<D, void, T.Signin, F>({
      act: async ($, input) => {
        const { password, username } = signinToDto(input);
        await $.signIn(username, password);
      },
      done: () => refresh$({ redirect: authenticatedRoute, switcher: opts.refresh }),
      fail: sagaFail(p),
    });

  const changePassword = <D, F = null>(p: T.ChangePasswordC<D, F>['P']): T.ChangePasswordC<D, F>['R'] =>
    saga({
      act: async ($, input) => {
        await $.changePassword(null, input.oldValue, input.newValue);
      },
      ...p,
    });

  const confirmSignup = <D, F = null>(p: T.ConfirmSignupC<D, F>['P']): T.ConfirmSignupC<D, F>['R'] =>
    saga<D, T.ConfirmSignup, T.ConfirmSignup, F>({
      act: async ($, input) => {
        await $.confirmSignUp(input.username, input.token, { forceAliasCreation: false });
        return input;
      },
      done: signin({ done: sagaDone(p) }),
      fail: sagaFail(p),
    });

  const fetch = () => saga<T.Maybe<T.Payload>>({ act: () => Auth.currentAuthenticatedUser(), fail: () => of(null) })().toPromise();

  const fromPayload = (p: T.Maybe<T.Payload>): T.Po => ({
    __typename: 'Auth',
    accessToken: p ? p.signInUserSession.idToken.jwtToken : null,
    role: p ? 'MEMBER' : 'PUBLIC',
    roles: [],
  });

  const resetPassword = <D, F = null>(p: T.ResetPasswordC<D, F>['P']): T.ResetPasswordC<D, F>['R'] =>
    saga({
      act: async ($, input) => {
        await $.forgotPasswordSubmit(input.username, input.token, input.password);
        return input;
      },
      done: signin({ done: sagaDone(p) }),
      fail: sagaFail(p),
    });

  const sendConfirmSignup = <D, F = null>(p: T.SendConfirmSignupC<D, F>['P']): T.SendConfirmSignupC<D, F>['R'] =>
    saga({
      act: async ($, input) => {
        await $.resendSignUp(input.username);
      },
      ...p,
    });

  const sendResetPassword = <D, F = null>(p: T.SendResetPasswordC<D, F>['P']): T.SendResetPasswordC<D, F>['R'] =>
    saga({ act: ($, input) => $.forgotPassword(input.username), ...p });

  const sendVerifyEmail = <D, F = null>(p: T.SendVerifyEmailC<D, F>['P']): T.SendVerifyEmailC<D, F>['R'] =>
    saga({ act: ($) => $.verifyCurrentUserAttribute('email'), ...p });

  const signout = <D, F = null>(p: T.SignoutC<D, F>['P']): T.SignoutC<D, F>['R'] =>
    saga({ act: ($) => $.signOut(), done: () => refresh$({ redirect: unauthenticatedRoute, switcher: opts.refresh }), fail: sagaFail(p) });

  const signup = <D, F = null>(p: T.SignupC<D, F>['P']): T.SignupC<D, F>['R'] =>
    saga({ act: async ($, input) => (await $.signUp(signupToDto(input))).userSub, ...p });

  const verifyEmail = <D, F = null>(p: T.VerifyEmailC<D, F>['P']): T.VerifyEmailC<D, F>['R'] =>
    saga({
      act: ($, input) => $.verifyCurrentUserAttributeSubmit('email', input),
      fail: sagaFail(p),
      //done: () => refresh$({ $niama, skipCache: true }).pipe(switchMap(sagaDone$(opts))),
    });

  const observables = {
    ...{ changePassword, confirmSignup, resetPassword, sendConfirmSignup, sendResetPassword, sendVerifyEmail, signin, signout },
    ...{ signup, verifyEmail },
  };
  return { service, opts, fetch, fromPayload, ...observables };
};

/*export async function getCurrent<C extends T.Config>(p?: T.GetCurrentP): Promise<T.Current> {
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
    fail: (err) => throwError(new Error(`amplify.${err['code']}`)).pipe(catchError(sagaFail$(p))),
  });
}*

export const deleteCurrent$ = ({ $niama, ...opts }: T.DeleteCurrentP): T.Observable =>
  saga$({
    saga: () => new Promise((r) => $niama.auth.current.dto.deleteUser(r)),
    fail: sagaFail$(opts),
    done: () => refresh$({ $niama, navigate: $niama.auth.signedOutRoute, resetApi: true, switcher: sagaDone$(opts) }),
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
        fail: () => throwError({ code: 'NotAuthorizedException' }),
        done: switcher,
      });
    },
  });

/*export function updateCurrent$<Attrs extends object>({ $niama, data, ...opts }: T.UpdateCurrentP<Attrs>): T.Observable {
  return saga$({
    saga: () => Auth.updateUserAttributes($niama.auth.current.raw, attrs),
    fail: sagaFail$(opts),
    done: () => refresh$({ $niama, skipCache: true }).pipe(switchMap(sagaDone$(opts))),
  });
}*

export function updateAttrs$<Attrs extends object>({ $niama, attrs, ...opts }: T.UpdateAttrsP<Attrs>): T.Observable {
  return saga$({
    saga: () => Auth.updateUserAttributes($niama.auth.current.dto, attrs),
    fail: sagaFail$(opts),
    done: () => refresh$({ $niama, skipCache: true }).pipe(switchMap(sagaDone$(opts))),
  });
}

*/
