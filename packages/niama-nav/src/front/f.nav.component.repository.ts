import { OrmRP } from '@niama/orm/front';
import Component, { mixins } from 'vue-class-component';

import { Nav } from '../universal/u.nav.model.entity';
import { api } from './f.nav.helper';

@Component
export class NavRP extends mixins<OrmRP<N.NavRP>>(OrmRP) {
  // VARIABLES =============================================================================================================================

  protected api = api;
  protected entityClass = Nav;
}
