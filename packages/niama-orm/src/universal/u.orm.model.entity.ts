import { authStatuses } from '@niama/auth';
import { fill, maybe, omit } from '@niama/core';
import { struct } from 'superstruct';

export class OrmE<R extends N.OrmR, Role extends string = string> implements N.OrmE {
  // STATIC ================================================================================================================================

  static schema: N.Map<N.OrmR> = {
    ...fill('string', '__typename', 'id'),
    ...fill(maybe('string'), 'createdAt', 'label', 'updatedAt'),
    ...fill(['string'], 'canDelete', 'canRead', 'canUpdate', 'canUpdateStatus'),
    status: struct.enum(authStatuses),
  };

  static defaults: Partial<N.OrmR> = fill(null, 'createdAt', 'label', 'updatedAt');

  // VARIABLES =============================================================================================================================

  canDelete!: Role[];
  canRead!: Role[];
  canUpdate!: Role[];
  canUpdateStatus!: Role[];
  createdAt!: N.Maybe<Date>;
  id!: string;
  label!: N.Maybe<string>;
  status!: NPri.AuthStatus;
  updatedAt!: N.Maybe<Date>;

  // LIFECYCLE =============================================================================================================================

  constructor(dto: Partial<R>, schema = OrmE.schema, defaults = OrmE.defaults) {
    const resource: R = struct(schema, defaults)(dto);
    Object.assign(this, omit(resource, ['__typename', 'createdAt', 'updatedAt']));
  }
}
