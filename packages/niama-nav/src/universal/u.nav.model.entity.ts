import { fill, maybe } from '@niama/core';
import { OrmE } from '@niama/orm';

export class Nav<Role extends string = string> extends OrmE<N.NavR<Role>, Role> implements N.Nav<Role> {
  // STATIC ================================================================================================================================

  static schema: N.Map<N.NavR> = {
    ...OrmE.schema,
    ...fill('string', 'parent', 'to'),
    exact: 'boolean',
    icon: maybe('string'),
    order: 'number',
  };

  static defaults: Partial<N.NavR> = { ...OrmE.defaults, __typename: 'Nav', status: 'OK' };

  // VARIABLES =============================================================================================================================

  exact!: boolean;
  icon!: N.Maybe<string>;
  order!: number;
  parent!: string;
  to!: string;

  // LIFECYCLE==============================================================================================================================

  constructor(dto: Partial<N.NavR<Role>>, schema = Nav.schema, defaults = Nav.defaults) {
    super(dto, schema, defaults);
  }

  toResource(): N.NavR<Role> {
    return { ...this, __typename: 'Nav', createdAt: null, updatedAt: null };
  }
}
