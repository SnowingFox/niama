import { fill, Map, omit } from '@niama/core';
import { struct } from 'superstruct';

import { ApiR } from './types';

export class ApiEntity<R extends ApiR> {
  // STATIC ================================================================================================================================

  static schema: Map<ApiR> = {
    ...fill('string', '__typename', 'id'),
  };

  static defaults: Partial<ApiR> = {};

  // VARIABLES =============================================================================================================================

  id!: string;

  // LIFECYCLE =============================================================================================================================

  constructor(dto: Partial<R>, schema = ApiEntity.schema, defaults = ApiEntity.defaults) {
    const resource: R = struct(schema, defaults)(dto);
    Object.assign(this, omit(resource, ['__typename']));
  }
}
