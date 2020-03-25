import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { getError, refresh$ } from '@niama/auth';
import { mapValues, saga as baseSaga, sagaDone, sagaFail } from '@niama/core';
import { AsyncSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as T from './types';

// INIT ====================================================================================================================================

export const initProvider = (opts: T.BootO): T.Provider => {
  const raw = initRaw(opts);
  const observables = {
    ...{ changePassword, confirmSignup, fetch, resetPassword, sendConfirmSignup, sendResetPassword, sendVerifyEmail, signin, signout },
    ...{ signup, verifyEmail },
  };
  return { fromPayload, opts, raw, ...(mapValues(observables, (s) => s({ opts, raw })) as Omit<T.Services, 'fromPayload'>) };
};

const initRaw = ({ config }: T.BootO): T.RawConfig => {
  const raw = { loading: false, $: new AsyncSubject<T.Raw>() };
  Amplify.configure(config);
  raw.$.next(Auth);
  raw.$.complete();
  return raw;
};

// SAGA ====================================================================================================================================

type SagaP<D, R = D, S = void, F = null> = { act: ($: T.Raw, ...src: [S]) => Promise<R>; raw: T.RawConfig } & T.SagaO<D, R, F>;

const saga = <D, R = D, S = void, F = null>({ act, raw, ...sagaO }: SagaP<D, R, S, F>): T.Observabler<D | F, S> => {
  const mapError = (err: Error) => (err.name ? getError(`amplify.${err.name}`) : err);
  return (...src: [S]) => raw.$.pipe(switchMap(baseSaga({ act: async ($) => act($, ...src), ...sagaO, mapError })));
};

// SERVICES ================================================================================================================================

const changePassword = ({ raw }: T.ServiceO) => <D, F = null>(p: T.ChangePasswordP<D, F>): T.ChangePasswordR<D, F> => {
  const act = async ($: T.Raw, input: Omit<T.ChangePassword, 'confirmation'>): Promise<void> => {
    await $.changePassword(null, input.oldValue, input.newValue);
  };
  return saga({ act, raw, ...p });
};

const confirmSignup = ({ opts, raw }: T.ServiceO) => <D, F = null>(p: T.ConfirmSignupP<D, F>): T.ConfirmSignupR<D, F> => {
  const act = async ($: T.Raw, input: T.ConfirmSignup) => {
    await $.confirmSignUp(input.username, input.token, { forceAliasCreation: false });
    return input;
  };
  const done: T.SigninR<D, D> = signin({ opts, raw })({ done: sagaDone(p) });
  const fail = sagaFail(p);
  return saga<D, T.ConfirmSignup, T.ConfirmSignup, F>({ act, done, fail, raw });
};

const fetch = ({ raw }: T.ServiceO) => () => {
  const act = () => Auth.currentAuthenticatedUser();
  const fail = () => of(null);
  return saga<T.Maybe<T.Payload>>({ act, fail, raw })().toPromise();
};

const fromPayload = (p: T.Maybe<T.Payload>): T.Po => ({
  __typename: 'Auth',
  accessToken: p ? p.signInUserSession.idToken.jwtToken : null,
  role: p ? 'MEMBER' : 'PUBLIC',
  roles: [],
});

const resetPassword = ({ opts, raw }: T.ServiceO) => <D, F = null>(p: T.ResetPasswordP<D, F>): T.ResetPasswordR<D, F> => {
  const act = async ($: T.Raw, input: T.ResetPassword): Promise<T.ResetPassword> => {
    await $.forgotPasswordSubmit(input.username, input.token, input.password);
    return input;
  };
  const done: T.SigninR<D, F> = signin({ opts, raw })({ done: sagaDone(p) });
  const fail = sagaFail(p);
  return saga({ act, done, fail, raw });
};

const sendConfirmSignup = ({ raw }: T.ServiceO) => <D, F = null>(p: T.SendConfirmSignupP<D, F>): T.SendConfirmSignupR<D, F> => {
  const act = async ($: T.Raw, input: T.SendConfirmSignup): Promise<void> => {
    await $.resendSignUp(input.username);
  };
  return saga({ act, raw, ...p });
};

const sendResetPassword = ({ raw }: T.ServiceO) => <D, F = null>(p: T.SendResetPasswordP<D, F>): T.SendResetPasswordR<D, F> => {
  const act = ($: T.Raw, input: T.SendResetPassword) => $.forgotPassword(input.username);
  return saga({ act, raw, ...p });
};

const sendVerifyEmail = ({ raw }: T.ServiceO) => <D, F = null>(p: T.SendVerifyEmailP<D, F>): T.SendVerifyEmailR<D, F> => {
  const act = ($: T.Raw) => $.verifyCurrentUserAttribute('email');
  return saga({ act, raw, ...p });
};

const signin = ({ opts, raw }: T.ServiceO) => <D, F = null>(p: T.SigninP<D, F>): T.SigninR<D, F> => {
  const { authenticatedRoute, refresh, signinToDto } = opts;
  const act = async ($: T.Raw, input: T.Signin): Promise<void> => {
    const { password, username } = signinToDto(input);
    await $.signIn(username, password);
  };
  const done = () => refresh$<D>({ redirect: authenticatedRoute, switcher: refresh });
  const fail = sagaFail(p);
  return saga<D, void, T.Signin, F>({ act, done, fail, raw });
};

const signout = ({ opts, raw }: T.ServiceO) => <D, F = null>(p: T.SignoutP<D, F>): T.SignoutR<D, F> => {
  const { refresh, unauthenticatedRoute } = opts;
  const act = ($: T.Raw) => $.signOut();
  const done = () => refresh$<D>({ redirect: unauthenticatedRoute, switcher: refresh });
  const fail = sagaFail(p);
  return saga({ act, done, fail, raw });
};

const signup = ({ opts, raw }: T.ServiceO) => <D, F = null>(p: T.SignupP<D, F>): T.SignupR<D, F> => {
  const { signupToDto } = opts;
  const act = async ($: T.Raw, input: T.Signup) => (await $.signUp(signupToDto(input))).userSub;
  return saga({ act, raw, ...p });
};

const verifyEmail = ({ raw }: T.ServiceO) => <D, F = null>(p: T.VerifyEmailP<D, F>): T.VerifyEmailR<D, F> => {
  const act = ($: T.Raw, input: string) => $.verifyCurrentUserAttributeSubmit('email', input);
  // const done = () => refresh$({ $niama, skipCache: true }).pipe(switchMap(sagaDone$(opts)))
  const fail = sagaFail(p);
  return saga({ act, fail, raw });
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
