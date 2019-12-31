import { Dto, Menu, MenuItem, MenuParent } from './main';

export interface DtosFromMenuP<Role extends string> {
  menu: Menu<Role>;
  roles?: RoleO<Role>;
}

export interface DtosFromMenuItemP<Role extends string> {
  item: MenuItem<Role>;
  order: number;
  parent: MenuParent<Role>;
  roles?: RoleO<Role>;
}

export interface DtosFromMenusP<Role extends string> {
  menus: Menu<Role>[];
  roles?: RoleO<Role>;
}

export interface ManyByGroupP<Vo extends Pick<Dto, 'group'>, Group extends string> {
  groups: Group[];
  items: Vo[];
}

export interface ManyFromGroupP<Vo extends Pick<Dto, 'group'>> {
  group: string;
  items: Vo[];
}

export interface RoleO<Role extends string> {
  all: Role[];
  current: Role[];
}
