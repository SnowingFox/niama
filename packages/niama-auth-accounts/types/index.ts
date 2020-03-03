import { AccountsClient } from '@accounts/client';
import { AccountsClientPassword } from '@accounts/client-password';
import { DocumentNode } from '@niama/api/types';

declare module '@niama/auth/types' {
  interface BootAuthO {
    userFieldsFragment?: DocumentNode;
  }

  interface Payload {
    accessToken: string;
    refreshToken: string;
  }

  interface SendConfirmSignup {
    email: string;
  }

  interface Service {
    client: AccountsClient;
    password: AccountsClientPassword;
  }

  interface TokenPayload {
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': string[];
      'x-hasura-default-role': string;
      'x-hasura-user-id': string;
    };
  }
}

export * from '@niama/auth/types';