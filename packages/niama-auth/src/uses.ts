import { useSagaReturns } from '@niama/core';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as T from './types';

/*export function useChangePassword({ input, src$, ...opts }: T.UseChangePasswordP): T.UseChangePasswordR {
  const $niama = useNiama();

  if (!$niama.auth.changePassword$) throw new Error('auth.errors.ChangePasswordUnknown');
  if (!input) input = reactive({ confirmation: '', newValue: '', oldValue: '' });
  if (!opts.fail$ && !opts.always$ && !opts.onAlways) opts.fail$ = (error) => notifyFail$({ $niama, error });

  const switcher = () => $niama.auth.changePassword$!({ $niama, data: omit(input!, ['confirmation']) });

  return { input, ...(src$ ? useLoadable({ src$, switcher }) : useSourcable(switcher)) };
}

export function useConfirmSignup({ input, src$, ...opts }: T.UseConfirmSignupP = {}): T.UseConfirmSignupR {
  const $niama = useNiama();

  if (!$niama.auth.confirmSignup$) throw new Error('auth.errors.ConfirmSignupUnknown');
  if (!input) input = reactive({ code: '', password: '', username: '' });
  if (!opts.fail$ && !opts.always$ && !opts.onAlways) opts.fail$ = (error) => notifyFail$({ $niama, error });

  const switcher = () => $niama.auth.confirmSignup$!({ $niama, data: input!, ...opts });

  return { input, ...(src$ ? useLoadable({ src$, switcher }) : useSourcable(switcher)) };
}

export function useDeleteCurrent({ src$, ...opts }: T.UseDeleteCurrentP = {}): T.UseDeleteCurrentR {
  const $niama = useNiama();

  if (!$niama.auth.deleteCurrent$) throw new Error('auth.errors.DeleteCurrentUnknown');
  if (!opts.fail$ && !opts.always$ && !opts.onAlways) opts.fail$ = (error) => notifyFail$({ $niama, error });

  const switcher = () => $niama.auth.deleteCurrent$!({ $niama, ...opts });

  return { ...(src$ ? useLoadable({ src$, switcher }) : useSourcable(switcher)) };
}

export function useResetPassword({ input, src$, ...opts }: T.UseResetPasswordP = {}): T.UseResetPasswordR {
  const $niama = useNiama();

  if (!$niama.auth.resetPassword$) throw new Error('auth.errors.ResetPasswordUnknown');
  if (!input) input = reactive({ code: '', password: '', username: '' });
  if (!opts.fail$ && !opts.always$ && !opts.onAlways) opts.fail$ = (error) => notifyFail$({ $niama, error });

  const switcher = () => $niama.auth.resetPassword$!({ $niama, data: input!, ...opts });

  return { input, ...(src$ ? useLoadable({ src$, switcher }) : useSourcable(switcher)) };
}

export function useSendEmailResetCode({ src$, ...opts }: T.UseSendEmailResetCodeP = {}): T.UseSendEmailResetCodeR {
  const $niama = useNiama();

  if (!$niama.auth.sendEmailResetCode$) throw new Error('auth.errors.SendEmailResetCodeUnknown');
  if (!opts.fail$ && !opts.always$ && !opts.onAlways) opts.fail$ = (error) => notifyFail$({ $niama, error });

  const switcher = () => $niama.auth.sendEmailResetCode$!({ $niama, ...opts });

  return { ...(src$ ? useLoadable({ src$, switcher }) : useSourcable(switcher)) };
}

export function useSendPasswordResetCode({ input, src$, ...opts }: T.UseSendPasswordResetCodeP = {}): T.UseSendPasswordResetCodeR {
  const $niama = useNiama();

  if (!$niama.auth.sendPasswordResetCode$) throw new Error('auth.errors.PasswordResetCodeUnknown');
  if (!input) input = reactive({ username: '' });
  if (!opts.fail$ && !opts.always$ && !opts.onAlways) opts.fail$ = (error) => notifyFail$({ $niama, error });

  const switcher = () => $niama.auth.sendPasswordResetCode$!({ $niama, data: input!, ...opts });

  return { input, ...(src$ ? useLoadable({ src$, switcher }) : useSourcable(switcher)) };
}

export function useSendSignupCode({ input, src$, ...opts }: T.UseSendSignupCodeP = {}): T.UseSendSignupCodeR {
  const $niama = useNiama();

  if (!$niama.auth.signup$) throw new Error('auth.errors.ResendSignupUnknown');
  if (!input) input = reactive({ username: '' });
  if (!opts.fail$ && !opts.always$ && !opts.onAlways) opts.fail$ = (error) => notifyFail$({ $niama, error });

  const switcher = () => $niama.auth.sendSignupCode$!({ $niama, data: input!, ...opts });

  return { input, ...(src$ ? useLoadable({ src$, switcher }) : useSourcable(switcher)) };
}*/

export function useGetCurrent<Done, Fail = null>(p: T.UseGetCurrentP<Done, Fail> = {}): T.UseGetCurrentR<Done, Fail | null> {
  const { $niama, done$, fail$ } = useSagaReturns({ notifyId: 'auth.GET_CURRENT_DONE', ...p });
  return () => $niama.auth.getCurrent$({ done$, fail$ });
}

export function useIsAuthenticated<Done, Fail = null>(p: any = {}): any {
  const { $niama, done$, fail$ } = useSagaReturns({ notifyId: 'auth.IS_AUTHENTICATED_DONE', ...p });
  return () =>
    $niama.auth.getRefreshedTokens$({}).pipe(
      map((tokens) => !!tokens),
      switchMap(done$),
      catchError(fail$)
    );
}

export function useSignin<Done = T.Signin, Fail = null>(p: T.UseSigninP<Done, Fail> = {}): T.UseSigninR<Done, Fail | null> {
  const { $niama, done$, fail$ } = useSagaReturns({ notifyId: 'auth.SIGNIN_DONE', ...p });
  return (input) => $niama.auth.signin$({ done$, fail$, input });
}

export function useSignout<Done, Fail = null>(p: T.UseSignoutP<Done, Fail> = {}): T.UseSignoutR<Done, Fail | null> {
  const { $niama, done$, fail$ } = useSagaReturns({ notifyId: 'auth.SIGNOUT_DONE', ...p });
  return () => $niama.auth.signout$({ done$, fail$ });
}

export function useSignup<Done = T.Signup, Fail = null>(p: T.UseSignupP<Done, Fail> = {}): T.UseSignupR<Done, Fail | null> {
  const { $niama, done$, fail$ } = useSagaReturns({ notifyId: 'auth.SIGNUP_DONE', ...p });
  return (input) => $niama.auth.signup$({ done$, fail$, input });
}

export function useVerifyEmail<Done = string, Fail = null>(p: T.UseVerifyEmailP<Done, Fail> = {}): T.UseVerifyEmailR<Done, Fail | null> {
  const { $niama, done$, fail$ } = useSagaReturns({ notifyId: 'auth.VERIFY_EMAIL_DONE', ...p });
  return (input) => $niama.auth.verifyEmail$({ done$, fail$, input });
}

/*export function useUpdateCurrent({ src$, ...opts }: T.UseUpdateCurrentP = {}): T.UseUpdateCurrent {
  const $niama = { api: useApi(), auth: useAuth(), i18n: useI18n(), router: useRouter() };

  if (!$niama.auth.updateCurrent$) throw new Error('auth.errors.DeleteCurrentUnknown');
  if (!opts.fail$ && !opts.always$ && !opts.onAlways) opts.fail$ = (error) => notifyFail$({ $niama, error });

  const switcher = () => $niama.auth.updateCurrent$!({ $niama, ...opts });

  return { ...(src$ ? useLoadable({ src$, switcher }) : useSourcable(switcher)) };
}*/
