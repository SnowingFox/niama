import { fill, Map, maybe, Maybe } from '@niama/core';
import { OrmModel } from '@niama/orm';

import { NavE, NavR } from './types';

export class Nav<Role extends string = string> extends OrmModel<NavR<Role>, Role> implements NavE<Role> {
  // STATIC ================================================================================================================================

  static schema: Map<NavR> = {
    ...OrmModel.schema,
    ...fill('string', 'parent', 'to'),
    exact: 'boolean',
    icon: maybe('string'),
    order: 'number',
  };

  static defaults: Partial<NavR> = { ...OrmModel.defaults, __typename: 'Nav', status: 'OK' };

  // VARIABLES =============================================================================================================================

  exact!: boolean;
  icon!: Maybe<string>;
  order!: number;
  parent!: string;
  to!: string;

  // LIFECYCLE==============================================================================================================================

  constructor(dto: Partial<NavR<Role>>, schema = Nav.schema, defaults = Nav.defaults) {
    super(dto, schema, defaults);
  }

  toResource(): NavR<Role> {
    return { ...this, __typename: 'Nav', createdAt: null, updatedAt: null };
  }
}
