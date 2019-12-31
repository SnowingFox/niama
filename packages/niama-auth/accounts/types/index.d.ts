import { DocumentNode } from '@niama/api/types';

import { ProviderO } from '../../types';

declare module '@niama/auth/types' {
  interface BootP extends ProviderO {
    userFieldsFragment?: DocumentNode;
  }

  interface TokenPayload {
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': Role[];
      'x-hasura-default-role': Role;
      'x-hasura-user-id': string;
    };
  }
}

export * from '@niama/auth/types';
