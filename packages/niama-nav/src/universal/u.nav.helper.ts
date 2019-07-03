import { getAuthCapsD } from '@niama/auth';
import { upperFirst } from '@niama/core';
import { getLabels } from '@niama/orm';

import { Nav } from './u.nav.model.entity';

// API =====================================================================================================================================

export const labels: N.OrmLabels = getLabels('nav');

// UTILS ===================================================================================================================================

export function manyFromMenu<Role extends string>(menu: N.NavMenu<Role>): Nav<Role>[] {
  return menu.children.flatMap((child, i) => manyFromMenuItem<Role>(child, menu.id, menu.to, i));
}

export function manyFromMenuItem<Role extends string>(
  menuItem: N.NavMenuItem<Role>,
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

export function manyFromMenus<Role extends string>(menus: N.NavMenu<Role>[]): Nav<Role>[] {
  return menus.flatMap(manyFromMenu);
}

export function resourcesFromMenus<Role extends string>(menus: N.NavMenu<Role>[]): N.NavR<Role>[] {
  return manyFromMenus(menus).map((nav) => nav.toResource());
}
