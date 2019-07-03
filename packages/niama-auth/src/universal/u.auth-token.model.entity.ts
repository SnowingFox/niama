import { ApiE } from '@niama/api';
import { fill } from '@niama/core';

export class AuthToken<Role extends string> extends ApiE<N.AuthTokenR> implements N.AuthToken {
  // STATIC ================================================================================================================================

  static schema: N.Map<N.AuthTokenR> = {
    ...fill('string', '__typename', 'aud', 'id', 'iss'),
    ...fill('number', 'exp', 'iat'),
    roles: 'any',
  };

  static defaults: Partial<N.AuthTokenR> = { __typename: 'Auth' };

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

  constructor(dto: Partial<N.AuthTokenR>, schema = AuthToken.schema, defaults = AuthToken.defaults) {
    super(dto, schema, defaults);
  }

  toResource(): N.AuthTokenR<Role> {
    return { ...this, __typename: 'Auth' };
  }
}
