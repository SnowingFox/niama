import { getAuthCapsD } from '@niama/auth';
import { upperFirst } from '@niama/core';
import { getLabels, OrmLabels } from '@niama/orm';

import { Nav } from './model.entity';
import { NavMenu, NavMenuItem, NavR } from './types';

// API =====================================================================================================================================

export const labels: OrmLabels = getLabels('nav');

// UTILS ===================================================================================================================================

export function manyFromMenu<Role extends string>(menu: NavMenu<Role>): Nav<Role>[] {
  return menu.children.flatMap((child, i) => manyFromMenuItem<Role>(child, menu.id, menu.to, i));
}

export function manyFromMenuItem<Role extends string>(
  menuItem: NavMenuItem<Role>,
  parent: string,
  parentTo: string,
  order: number
): Nav<Role>[] {
  const { authenticated, authorized, children, exact, icon } = menuItem;
  const id: string = `${parent}${upperFirst(menuItem.id)}`;
  const to: string = `${parentTo}${menuItem.to}`;
  const descendants: Nav<Role>[] = (children || []).flatMap((child, i) => manyFromMenuItem(child, id, to, i));
  return [new Nav({ id, order, parent, to, exact: !!exact, icon: icon || null, ...getAuthCapsD() }), ...descendants];
}

export function manyFromMenus<Role extends string>(menus: NavMenu<Role>[]): Nav<Role>[] {
  return menus.flatMap(manyFromMenu);
}

export function resourcesFromMenus<Role extends string>(menus: NavMenu<Role>[]): NavR<Role>[] {
  return manyFromMenus(menus).map((nav) => nav.toResource());
}
