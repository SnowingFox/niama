import { hasIntersection, upperFirst } from '@niama/core';
import { getDtoD } from '@niama/orm';

import * as T from './types';

export function dtosFromMenuItem<Role extends string>({ item, order, parent, roles }: T.DtosFromMenuItemP<Role>): T.Dto<Role>[] {
  roles = { all: ['PUBLIC'], current: ['PUBLIC'], ...roles } as T.RoleO<Role>;
  const canRead: Role[] = item.canRead || parent.canRead || roles.all || [];
  if (!hasIntersection(canRead, roles.current)) return [];

  const id = `${parent.id}${upperFirst(item.id)}`;
  const to = `${parent.to}${item.to}`;
  const { children = [], exact = false, group = null, icon = null } = item;
  return [
    { ...getDtoD(), __typename: 'Nav', canRead, exact, group, icon, id, order, to, parent: parent.id },
    ...children.flatMap((child, order) => dtosFromMenuItem({ order, roles, item: child, parent: { canRead, id, to } })),
  ];
}

export function dtosFromMenu<Role extends string>({ menu: { canRead, children, id, to }, roles }: T.DtosFromMenuP<Role>): T.Dto<Role>[] {
  return children.flatMap((item, order) => dtosFromMenuItem<Role>({ item, order, roles, parent: { canRead, id, to } }));
}

export function dtosFromMenus<Role extends string>({ menus, roles }: T.DtosFromMenusP<Role>): T.Dto<Role>[] {
  return menus.flatMap((menu) => dtosFromMenu({ menu, roles }));
}

export function manyFromGroup<Vo extends Pick<T.Dto, 'group'>>({ group, items = [] }: T.ManyFromGroupP<Vo>): Vo[] {
  return items.filter((item) => item.group === group);
}

export function manyByGroup<Vo extends Pick<T.Dto, 'group'>, Group extends string>(p: T.ManyByGroupP<Vo, Group>): Record<Group, Vo[]> {
  const { groups = [], items = [] } = p;
  return groups.reduce((r, group) => ({ ...r, [group]: manyFromGroup({ group, items }) }), {}) as Record<Group, Vo[]>;
}
