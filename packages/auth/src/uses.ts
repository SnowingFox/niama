import { upperFirst, useLoadable, useSagaReturns, useSourcable } from '@niama/core';
import { useQuery, useResult } from '@vue/apollo-composable';

import { rp } from './api';
import * as T from './types';
import { header } from './utils';

// BASE ====================================================================================================================================

export const useSaga = <C extends T.SagaCfg>({ name, ...p }: { name: string } & C['UseP']): C['R'] => {
  const { $niama, done, fail } = useSagaReturns({ notifyId: `auth.Use${upperFirst(name)}`, ...p });
  return $niama.auth[name]({ done, fail });
};

export const useSagaL$ = <C extends T.SagaCfg>({ name, ...p }: { name: string } & C['L$P']): C['L$R'] => {
  const { src$, ...rest } = p;
  return useLoadable({ src$, switcher: useSaga<C>({ name, ...rest }) });
};

export const useSagaS$ = <C extends T.SagaCfg>(p: { name: string } & C['UseP']): C['S$R'] => useSourcable(useSaga<C>(p));

// USES ====================================================================================================================================

export const useAuthorizationHeader = () => {
  const { result } = useQuery<T.Dict<T.Po>>(rp.O.read);
  return useResult(result, null, (r) => header(r[rp.L.read]));
};

export const useIsAuthenticated = (): T.Ref<boolean> => {
  const { result } = useQuery<T.Dict<T.Po>>(rp.O.read);
  return useResult(result, false, (r) => r[rp.L.read].role !== 'PUBLIC');
};

export const useChangePassword = <D = void, F = null>(p: T.UseChangePasswordP<D, F> = {}) =>
  useSaga<T.ChangePasswordC<D, F>>({ name: 'changePassword', ...p });

export const useChangePasswordL$ = <D = void, F = null>(p: T.UseChangePasswordL$P<D, F>) =>
  useSagaL$<T.ChangePasswordC<D, F>>({ name: 'changePassword', ...p });

export const useChangePasswordS$ = <D = void, F = null>(p: T.UseChangePasswordP<D, F> = {}) =>
  useSagaS$<T.ChangePasswordC<D, F>>({ name: 'changePassword', ...p });

export const useConfirmSignup = <D = void, F = null>(p: T.UseConfirmSignupP<D, F> = {}) =>
  useSaga<T.ConfirmSignupC<D, F>>({ name: 'confirmSignup', ...p });

export const useConfirmSignupL$ = <D = void, F = null>(p: T.UseConfirmSignupL$P<D, F>) =>
  useSagaL$<T.ConfirmSignupC<D, F>>({ name: 'confirmSignup', ...p });

export const useConfirmSignupS$ = <D = void, F = null>(p: T.UseConfirmSignupP<D, F> = {}) =>
  useSagaS$<T.ConfirmSignupC<D, F>>({ name: 'confirmSignup', ...p });

export const useDeleteCurrent = <D, F = null>(p: any): any => {
  const { $niama, done, fail } = useSagaReturns({ notifyId: 'auth.UseDeleteCurrent', ...p });
  return $niama.auth.changePassword({ done, fail });
};

export const useResetPassword = <D = void, F = null>(p: T.UseResetPasswordP<D, F> = {}) =>
  useSaga<T.ResetPasswordC<D, F>>({ name: 'resetPassword', ...p });

export const useResetPasswordL$ = <D = void, F = null>(p: T.UseResetPasswordL$P<D, F>) =>
  useSagaL$<T.ResetPasswordC<D, F>>({ name: 'resetPassword', ...p });

export const useResetPasswordS$ = <D = void, F = null>(p: T.UseResetPasswordP<D, F> = {}) =>
  useSagaS$<T.ResetPasswordC<D, F>>({ name: 'resetPassword', ...p });

export const useSendConfirmSignup = <D = void, F = null>(p: T.UseSendConfirmSignupP<D, F> = {}) =>
  useSaga<T.SendConfirmSignupC<D, F>>({ name: 'sendConfirmSignup', ...p });

export const useSendConfirmSignupL$ = <D = void, F = null>(p: T.UseSendConfirmSignupL$P<D, F>) =>
  useSagaL$<T.SendConfirmSignupC<D, F>>({ name: 'sendConfirmSignup', ...p });

export const useSendConfirmSignupS$ = <D = void, F = null>(p: T.UseSendConfirmSignupP<D, F> = {}) =>
  useSagaS$<T.SendConfirmSignupC<D, F>>({ name: 'sendConfirmSignup', ...p });

export const useSendResetPassword = <D = void, F = null>(p: T.UseSendResetPasswordP<D, F> = {}) =>
  useSaga<T.SendResetPasswordC<D, F>>({ name: 'sendResetPassword', ...p });

export const useSendResetPasswordL$ = <D = void, F = null>(p: T.UseSendResetPasswordL$P<D, F>) =>
  useSagaL$<T.SendResetPasswordC<D, F>>({ name: 'sendResetPassword', ...p });

export const useSendResetPasswordS$ = <D = void, F = null>(p: T.UseSendResetPasswordP<D, F> = {}) =>
  useSagaS$<T.SendResetPasswordC<D, F>>({ name: 'sendResetPassword', ...p });

/*export function useGetCurrent<Done, Fail = null>(p: T.UseGetCurrentP<Done, Fail> = {}): T.UseGetCurrentR<Done, Fail | null> {
  const { $niama, done, fail } = useSagaReturns({ notifyId: 'auth.GET_CURRENT_DONE', ...p });
  return () => $niama.auth.getCurrent$({ done, fail });
}

export function useIsAuthenticated<Done, Fail = null>(p: any = {}): any {
  const { $niama, done, fail } = useSagaReturns({ notifyId: 'auth.IS_AUTHENTICATED_DONE', ...p });
  return () =>
    $niama.auth.getRefreshedTokens$({}).pipe(
      map((tokens) => !!tokens),
      switchMap(done),
      catchError(fail)
    );
}*/

export const useSignin = <D = void, F = null>(p: T.UseSigninP<D, F> = {}) => useSaga<T.SigninC<D, F>>({ name: 'signin', ...p });
export const useSigninL$ = <D = void, F = null>(p: T.UseSigninL$P<D, F>) => useSagaL$<T.SigninC<D, F>>({ name: 'signin', ...p });
export const useSigninS$ = <D = void, F = null>(p: T.UseSigninP<D, F> = {}) => useSagaS$<T.SigninC<D, F>>({ name: 'signin', ...p });
export const useSignout = <D = void, F = null>(p: T.UseSignoutP<D, F> = {}) => useSaga<T.SignoutC<D, F>>({ name: 'signout', ...p });
export const useSignoutL$ = <D = void, F = null>(p: T.UseSignoutL$P<D, F>) => useSagaL$<T.SignoutC<D, F>>({ name: 'signout', ...p });
export const useSignoutS$ = <D = void, F = null>(p: T.UseSignoutP<D, F> = {}) => useSagaS$<T.SignoutC<D, F>>({ name: 'signout', ...p });
export const useSignup = <D = void, F = null>(p: T.UseSignupP<D, F> = {}) => useSaga<T.SignupC<D, F>>({ name: 'signup', ...p });
export const useSignupL$ = <D = void, F = null>(p: T.UseSignupL$P<D, F>) => useSagaL$<T.SignupC<D, F>>({ name: 'signup', ...p });
export const useSignupS$ = <D = void, F = null>(p: T.UseSignupP<D, F> = {}) => useSagaS$<T.SignupC<D, F>>({ name: 'signup', ...p });

export const useVerifyEmail = <D = void, F = null>(p: T.UseVerifyEmailP<D, F> = {}) =>
  useSaga<T.VerifyEmailC<D, F>>({ name: 'verifyEmail', ...p });

export const useVerifyEmailL$ = <D = void, F = null>(p: T.UseVerifyEmailL$P<D, F>) =>
  useSagaL$<T.VerifyEmailC<D, F>>({ name: 'verifyEmail', ...p });

export const useVerifyEmailS$ = <D = void, F = null>(p: T.UseVerifyEmailP<D, F> = {}) =>
  useSagaS$<T.VerifyEmailC<D, F>>({ name: 'verifyEmail', ...p });

/*export function useUpdateCurrent({ src$, ...opts }: T.UseUpdateCurrentP = {}): T.UseUpdateCurrent {
  const $niama = { api: useApi(), auth: useAuth(), i18n: useI18n(), router: useRouter() };

  if (!$niama.auth.UpdateCurrent$) throw new Error('auth.errors.DeleteCurrentUnknown');
  if (!opts.fail && !opts.always && !opts.onAlways) opts.fail = (error) => notifyFail$({ $niama, error });

  const switcher = () => $niama.auth.UpdateCurrent$!({ $niama, ...opts });

  return { ...(src$ ? useLoadable({ src$, switcher }) : useSourcable(switcher)) };
}*/
