import { AuthStatus, authStatuses } from '@niama/auth';
import { fill, Map, maybe, Maybe, omit } from '@niama/core';
import { struct } from 'superstruct';

import { OrmE, OrmR } from './types';

export class OrmModel<R extends OrmR, Role extends string = string> implements OrmE {
  // STATIC ================================================================================================================================

  static schema: Map<OrmR> = {
    ...fill('string', '__typename', 'id'),
    ...fill(maybe('string'), 'createdAt', 'label', 'updatedAt'),
    ...fill(['string'], 'canDelete', 'canRead', 'canUpdate', 'canUpdateStatus'),
    status: struct.enum(authStatuses),
  };

  static defaults: Partial<OrmR> = fill(null, 'createdAt', 'label', 'updatedAt');

  // VARIABLES =============================================================================================================================

  canDelete!: Role[];
  canRead!: Role[];
  canUpdate!: Role[];
  canUpdateStatus!: Role[];
  createdAt!: Maybe<Date>;
  id!: string;
  label!: Maybe<string>;
  status!: AuthStatus;
  updatedAt!: Maybe<Date>;

  // LIFECYCLE =============================================================================================================================

  constructor(dto: Partial<R>, schema = OrmModel.schema, defaults = OrmModel.defaults) {
    const resource: R = struct(schema, defaults)(dto);
    Object.assign(this, omit(resource, ['__typename', 'createdAt', 'updatedAt']));
  }
}
