import { fill, Map, omit } from '@niama/core';
import { struct } from 'superstruct';

import { ApiR } from './types';

export class ApiModel<R extends ApiR> {
  // STATIC ================================================================================================================================

  static schema: Map<ApiR> = {
    ...fill('string', '__typename', 'id'),
  };

  static defaults: Partial<ApiR> = {};

  // VARIABLES =============================================================================================================================

  id!: string;

  // LIFECYCLE =============================================================================================================================

  constructor(dto: Partial<R>, schema = ApiModel.schema, defaults = ApiModel.defaults) {
    const resource: R = struct(schema, defaults)(dto);
    Object.assign(this, omit(resource, ['__typename']));
  }
}
