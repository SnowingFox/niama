import { ApiEntity } from '@niama/api';
import { fill, Map } from '@niama/core';

import { AuthTokenE, AuthTokenR } from './types';

export class AuthToken<Role extends string> extends ApiEntity<AuthTokenR> implements AuthTokenE {
  // STATIC ================================================================================================================================

  static schema: Map<AuthTokenR> = {
    ...fill('string', '__typename', 'aud', 'id', 'iss'),
    ...fill('number', 'exp', 'iat'),
    roles: 'any',
  };

  static defaults: Partial<AuthTokenR> = { __typename: 'Auth' };

  // VARIABLES =============================================================================================================================

  aud!: string;
  exp!: number;
  iat!: number;
  id!: string;
  iss!: string;
  roles!: Role[];

  get firstRole(): Role {
    return this.roles[0];
  }

  // LIFECYCLE==============================================================================================================================

  constructor(dto: Partial<AuthTokenR>, schema = AuthToken.schema, defaults = AuthToken.defaults) {
    super(dto, schema, defaults);
  }

  toResource(): AuthTokenR<Role> {
    return { ...this, __typename: 'Auth' };
  }
}
