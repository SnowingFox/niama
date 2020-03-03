import { AccountsClient } from '@accounts/client';
import { AccountsClientPassword } from '@accounts/client-password';
import GraphQLClient from '@accounts/graphql-client';
import { getError, refresh$ } from '@niama/auth';
import { getProvider, saga as baseSaga, sagaFail } from '@niama/core';
import { decode } from 'jsonwebtoken';
import { AsyncSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as T from './types';

const initService = ({ userFieldsFragment }: T.BootAuthO): T.ServiceConfig => {
  const service = { loading: false, $: new AsyncSubject<T.Service>() };
  const $api = getProvider('api');
  const accountsGraphQL = new GraphQLClient({ graphQLClient: $api, userFieldsFragment });
  const client = new AccountsClient({}, accountsGraphQL);
  const password = new AccountsClientPassword(client);
  service.$.next({ client, password });
  service.$.complete();
  return service;
};

export function initProvider(opts: T.BootAuthO): T.Provider {
  const { authenticatedRoute, signinToDto, signupToDto, unauthenticatedRoute } = opts;
  const service = initService(opts);

  type SagaP<D, R = D, S = void, F = null> = { act: ($: T.Service, ...src: [S]) => Promise<R> } & T.SagaO<D, R, F>;

  const saga = <D, R = D, S = void, F = null>({ act, ...sagaO }: SagaP<D, R, S, F>): T.Observabler<D | F, S> => {
    const mapError = (err: Error) => {
      console.log('accounts', err);
      return err.name ? getError(`accounts.${err.name}`) : err;
    }
    return (...src: [S]) => service.$.pipe(switchMap(baseSaga({ act: async ($) => act($, ...src), ...sagaO, mapError })));
  };

  const signin = <D, F = null>(p: T.SigninC<D, F>['P']): T.SigninC<D, F>['R'] =>
    saga({
      act: ($, input) => $.password.login(signinToDto(input)),
      done: () => refresh$({ redirect: authenticatedRoute, switcher: opts.refresh }),
      fail: sagaFail(p),
    });

  const fetch = () => saga<T.Maybe<T.Payload>>({ act: ($) => $.client.refreshSession() })().toPromise();

  const fromPayload = (p: T.Maybe<T.Payload>): T.Po => {
    if (!p) return { __typename: 'Auth', accessToken: '', role: 'PUBLIC', roles: [] };
    const { 'https://hasura.io/jwt/claims': hasura }: T.TokenPayload = decode(p.accessToken) as T.TokenPayload;
    return {
      __typename: 'Auth',
      accessToken: p.accessToken,
      role: hasura['x-hasura-default-role'] as T.Role,
      roles: hasura['x-hasura-allowed-roles'] as T.Role[],
    };
  };

  const changePassword = <D, F = null>(p: T.ChangePasswordC<D, F>['P']): T.ChangePasswordC<D, F>['R'] =>
    saga({ act: ($, input) => $.password.changePassword(input.oldValue, input.newValue), ...p });

  const confirmSignup = <D, F = null>(p: T.ConfirmSignupC<D, F>['P']): T.ConfirmSignupC<D, F>['R'] =>
    saga({
      act: async ($, input) => {
        await $.password.verifyEmail(input.token);
        return input;
      },
      ...p,
    });

  const resetPassword = <D, F = null>(p: T.ResetPasswordC<D, F>['P']): T.ResetPasswordC<D, F>['R'] =>
    saga({ act: ($, input) => $.password.resetPassword(input.token, input.password), ...p });

  const sendConfirmSignup = <D, F = null>(p: T.SendConfirmSignupC<D, F>['P']): T.SendConfirmSignupC<D, F>['R'] =>
    saga({ act: ($, input) => $.password.requestVerificationEmail(input.email), ...p });

  const sendResetPassword = <D, F = null>(p: T.SendResetPasswordC<D, F>['P']): T.SendResetPasswordC<D, F>['R'] =>
    saga({ act: ($, input) => $.password.requestPasswordReset(input.email), ...p });

  const sendVerifyEmail = <D, F = null>(p: T.SendVerifyEmailC<D, F>['P']): T.SendVerifyEmailC<D, F>['R'] =>
    saga({ act: ($, input) => $.password.requestVerificationEmail(input.email), ...p });

  const signout = <D, F = null>(p: T.SignoutC<D, F>['P']): T.SignoutC<D, F>['R'] =>
    saga({
      act: ($) => $.client.logout(),
      done: () => refresh$({ redirect: unauthenticatedRoute, switcher: opts.refresh }),
      fail: sagaFail(p),
    });

  const signup = <D, F = null>(p: T.SignupC<D, F>['P']): T.SignupC<D, F>['R'] =>
    saga({ act: ($, input) => $.password.createUser(signupToDto(input)), ...p });

  const verifyEmail = <D, F = null>(p: T.VerifyEmailC<D, F>['P']): T.VerifyEmailC<D, F>['R'] =>
    saga({ act: ($, input) => $.password.verifyEmail(input), ...p });

  const observables = {
    ...{ changePassword, confirmSignup, resetPassword, sendConfirmSignup, sendResetPassword, sendVerifyEmail, signin, signout },
    ...{ signup, verifyEmail },
  };
  return { service, opts, fetch, fromPayload, ...observables };
}
