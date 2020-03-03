import * as Auth from '@niama/auth/types';

import { Menu, MenuItem, MenuParent, Po } from './main';

export interface DtosFromMenuP {
  menu: Menu;
  roles?: RoleO;
}

export interface DtosFromMenuItemP {
  item: MenuItem;
  order: number;
  parent: MenuParent;
  roles?: RoleO;
}

export interface DtosFromMenusP {
  menus: Menu[];
  roles?: RoleO;
}

export interface ManyByGroupP<Vo extends Pick<Po, 'group'>, Group extends string> {
  groups: Group[];
  items: Vo[] | Readonly<Vo[]>;
}

export interface ManyFromGroupP<Vo extends Pick<Po, 'group'>> {
  group: string;
  items: Vo[] | Readonly<Vo[]>;
}

export interface RoleO {
  all: Auth.Role[];
  current: Auth.Role[];
}
