import { useApi } from '@niama/api';
import { getLoadable, getSourcable, notifyError$, omit, useI18n, useRouter } from '@niama/core';
import { reactive } from '@vue/composition-api';

import { useAuth } from './provider';
import * as T from './types';

export function useChangePassword({ input, source$, ...opts }: T.UseChangePasswordP): T.UseChangePasswordR {
  const $niama = { auth: useAuth(), i18n: useI18n() };

  if (!$niama.auth.changePassword$) throw new Error('auth.errors.ChangePasswordUnknown');
  if (!input) input = reactive({ confirmation: '', newValue: '', oldValue: '' });
  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () => $niama.auth.changePassword$!({ $niama, data: omit(input!, ['confirmation']) });

  return { input, ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}

export function useConfirmSignup({ input, source$, ...opts }: T.UseConfirmSignupP = {}): T.UseConfirmSignupR {
  const $niama = { api: useApi(), auth: useAuth(), i18n: useI18n(), router: useRouter() };

  if (!$niama.auth.confirmSignup$) throw new Error('auth.errors.ConfirmSignupUnknown');
  if (!input) input = reactive({ code: '', password: '', username: '' });
  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () => $niama.auth.confirmSignup$!({ $niama, data: input!, ...opts });

  return { input, ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}

export function useDeleteCurrent({ source$, ...opts }: T.UseDeleteCurrentP = {}): T.UseDeleteCurrentR {
  const $niama = { api: useApi(), auth: useAuth(), i18n: useI18n(), router: useRouter() };

  if (!$niama.auth.deleteCurrent$) throw new Error('auth.errors.DeleteCurrentUnknown');
  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () => $niama.auth.deleteCurrent$!({ $niama, ...opts });

  return { ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}

export function useResetPassword({ input, source$, ...opts }: T.UseResetPasswordP = {}): T.UseResetPasswordR {
  const $niama = { api: useApi(), auth: useAuth(), i18n: useI18n(), router: useRouter() };

  if (!$niama.auth.resetPassword$) throw new Error('auth.errors.ResetPasswordUnknown');
  if (!input) input = reactive({ code: '', password: '', username: '' });
  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () => $niama.auth.resetPassword$!({ $niama, data: input!, ...opts });

  return { input, ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}

export function useSendEmailResetCode({ source$, ...opts }: T.UseSendEmailResetCodeP = {}): T.UseSendEmailResetCodeR {
  const $niama = { auth: useAuth(), i18n: useI18n() };

  if (!$niama.auth.sendEmailResetCode$) throw new Error('auth.errors.SendEmailResetCodeUnknown');
  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () => $niama.auth.sendEmailResetCode$!({ $niama, ...opts });

  return { ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}

export function useSendPasswordResetCode({ input, source$, ...opts }: T.UseSendPasswordResetCodeP = {}): T.UseSendPasswordResetCodeR {
  const $niama = { auth: useAuth(), i18n: useI18n() };

  if (!$niama.auth.sendPasswordResetCode$) throw new Error('auth.errors.PasswordResetCodeUnknown');
  if (!input) input = reactive({ username: '' });
  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () => $niama.auth.sendPasswordResetCode$!({ $niama, data: input!, ...opts });

  return { input, ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}

export function useSendSignupCode({ input, source$, ...opts }: T.UseSendSignupCodeP = {}): T.UseSendSignupCodeR {
  const $niama = { api: useApi(), auth: useAuth(), i18n: useI18n() };

  if (!$niama.auth.signup$) throw new Error('auth.errors.ResendSignupUnknown');
  if (!input) input = reactive({ username: '' });
  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () => $niama.auth.sendSignupCode$!({ $niama, data: input!, ...opts });

  return { input, ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}

export function useSignin({ input, source$, ...opts }: T.UseSigninP = {}): T.UseSigninR {
  const $niama = { api: useApi(), auth: useAuth(), i18n: useI18n(), router: useRouter() };

  if (!input) input = reactive({ password: '', username: '' });
  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () => $niama.auth.signin$({ $niama, data: input!, ...opts });

  return { input, ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}

export function useSignout({ source$, ...opts }: T.UseSignoutP = {}): T.UseSignoutR {
  const $niama = { api: useApi(), auth: useAuth(), i18n: useI18n(), router: useRouter() };

  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () => $niama.auth.signout$({ $niama, ...opts });

  return { ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}

export function useSignup({ input, source$, ...opts }: T.UseSignupP = {}): T.UseSignupR {
  const $niama = { api: useApi(), auth: useAuth(), i18n: useI18n() };

  if (!$niama.auth.signup$) throw new Error('auth.errors.SignupUnknown');
  if (!input) input = reactive({ password: '', username: '' });
  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () => $niama.auth.signup$!({ $niama, data: input!, ...opts });

  return { input, ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}

/*export function useUpdateCurrent({ source$, ...opts }: T.UseUpdateCurrentP = {}): T.UseUpdateCurrent {
  const $niama = { api: useApi(), auth: useAuth(), i18n: useI18n(), router: useRouter() };

  if (!$niama.auth.updateCurrent$) throw new Error('auth.errors.DeleteCurrentUnknown');
  if (!opts.error$ && !opts.complete$ && !opts.onComplete) opts.error$ = (error) => notifyError$({ $niama, error });

  const switcher = () => $niama.auth.updateCurrent$!({ $niama, ...opts });

  return { ...(source$ ? getLoadable({ source$, switcher }) : getSourcable(switcher)) };
}*/
