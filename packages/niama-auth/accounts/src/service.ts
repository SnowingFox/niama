import { AccountsClient } from '@accounts/client';
import { AccountsClientPassword } from '@accounts/client-password';
import GraphQLClient from '@accounts/graphql-client';
import { saga$, sagaDone$, sagaFail$ } from '@niama/core';
import { decode } from 'jsonwebtoken';
import { switchMap } from 'rxjs/operators';

import * as T from './types';

export function initProvider({ api, signinToDto, signupToDto, userFieldsFragment }: T.InitProviderP): T.Provider {
  const accountsGraphQL = new GraphQLClient({ graphQLClient: api, userFieldsFragment });
  const client = new AccountsClient({}, accountsGraphQL);
  const password = new AccountsClientPassword(client);

  return {
    signinToDto,
    signupToDto,
    refreshSession: () => client.refreshSession(),
    changePassword$: ({ input, ...opts }) => saga$({ saga: () => password.changePassword(input.oldValue, input.newValue), ...opts }),
    getCurrent$: (opts) => saga$({ saga: () => client.getUser(), ...opts }),

    getInfo: async () => {
      const tokens = await client.refreshSession();
      if (!tokens) return null;
      const { 'https://hasura.io/jwt/claims': hasura }: T.TokenPayload = decode(tokens.accessToken) as T.TokenPayload;
      return { id: hasura['x-hasura-user-id'], role: hasura['x-hasura-default-role'], roles: hasura['x-hasura-allowed-roles'] };
    },

    getRefreshedTokens$: (opts) => saga$({ saga: () => client.refreshSession(), ...opts }),
    resetPassword$: ({ input, ...opts }) => saga$({ saga: () => password.resetPassword(input.token, input.password), ...opts }),
    sendEmailVerification$: ({ input, ...opts }) => saga$({ saga: () => password.requestVerificationEmail(input.email), ...opts }),
    sendPasswordReset$: ({ input, ...opts }) => saga$({ saga: () => password.requestPasswordReset(input.email), ...opts }),
    
    signin$: ({ input, ...opts }) =>
      saga$({
        saga: () => password.login(signinToDto(input)),
        done$: () => api.resetStore$.pipe(switchMap(sagaDone$(opts))),
        fail$: sagaFail$(opts),
      }),

    signout$: (opts) =>
      saga$({
        saga: () => client.logout(),
        done$: () => api.resetStore$.pipe(switchMap(() => sagaDone$(opts)())),
        fail$: sagaFail$(opts),
      }),

    signup$: ({ input, ...opts }) => saga$({ saga: () => password.createUser(signupToDto(input)), ...opts }),
    verifyEmail$: ({ input, ...opts }) => saga$({ saga: () => password.verifyEmail(input), ...opts }),
  };
}
