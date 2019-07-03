import { fill, omit } from '@niama/core';
import { struct } from 'superstruct';

export class ApiE<R extends N.ApiR> {
  // STATIC ================================================================================================================================

  static schema: N.Map<N.ApiR> = {
    ...fill('string', '__typename', 'id'),
  };

  static defaults: Partial<N.ApiR> = {};

  // VARIABLES =============================================================================================================================

  id!: string;

  // LIFECYCLE =============================================================================================================================

  constructor(dto: Partial<R>, schema = ApiE.schema, defaults = ApiE.defaults) {
    const resource: R = struct(schema, defaults)(dto);
    Object.assign(this, omit(resource, ['__typename']));
  }
}
