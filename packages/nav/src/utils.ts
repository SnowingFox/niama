import { hasIntersection, upperFirst } from '@niama/core';
import { getPoD } from '@niama/orm';

import * as T from './types';

export const posFromMenuItem = ({ item, order, parent, roles }: T.DtosFromMenuItemP): T.Po[] => {
  roles = { all: ['PUBLIC'], current: ['PUBLIC'], ...roles } as T.RoleO;
  const canRead: T.Auth.Role[] = item.canRead || parent.canRead || roles.all || [];
  if (!hasIntersection(canRead, roles.current)) return [];

  const id = `${parent.id}${upperFirst(item.id)}`;
  const to = `${parent.to}${item.to}`;
  const { children = [], exact = false, group = null, icon = null } = item;
  return [
    { ...getPoD(), __typename: 'Nav', canRead, exact, group, icon, id, order, to, parent: parent.id },
    ...children.flatMap((child, order) => posFromMenuItem({ order, roles, item: child, parent: { canRead, id, to } })),
  ];
};

export const posFromMenu = ({ menu: { canRead, children, id, to }, roles }: T.DtosFromMenuP): T.Po[] =>
  children.flatMap((item, order) => posFromMenuItem({ item, order, roles, parent: { canRead, id, to } }));

export const posFromMenus = ({ menus, roles }: T.DtosFromMenusP): T.Po[] => menus.flatMap((menu) => posFromMenu({ menu, roles }));

export function manyFromGroup<Vo extends Pick<T.Po, 'group'>>({ group, items = [] }: T.ManyFromGroupP<Vo>): Vo[] {
  return items.filter((item) => item.group === group);
}

export function manyByGroup<Vo extends Pick<T.Po, 'group'>, Group extends string>(p: T.ManyByGroupP<Vo, Group>): Record<Group, Vo[]> {
  const { groups = [], items = [] } = p;
  return groups.reduce((r, group) => ({ ...r, [group]: manyFromGroup({ group, items }) }), {}) as Record<Group, Vo[]>;
}
