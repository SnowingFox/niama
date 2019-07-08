import { Nav } from '@niama/nav';
import { OrmRP } from '@niama/orm-client';
import Component, { mixins } from 'vue-class-component';

import { api } from './helper';
import { NavRPO } from './types';

@Component
export class NavRP extends mixins<OrmRP<NavRPO>>(OrmRP) {
  // VARIABLES =============================================================================================================================

  protected api = api;
  protected entityClass = Nav;
}
