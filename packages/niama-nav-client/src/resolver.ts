import { InMemoryCache } from '@niama/api-client';
import { AuthToken } from '@niama/auth';
import { Maybe } from '@niama/core';
import { NavMenu, NavR, navResourcesFromMenus } from '@niama/nav';

import { api } from './helper';

export function getInitialData<Role extends string>(menus: NavMenu<Role>[], auth: Maybe<AuthToken<Role>> = null): { navs: NavR[] } {
  return { navs: navResourcesFromMenus(menus) };
}

export function getRS<Role extends string>() {
  return {
    Query: {
      navs: (_: any, { where }: { where: any }, { cache }: { cache: InMemoryCache }): NavR[] => {
        const navsData: Maybe<{ navs: NavR[] }> = cache.readQuery({ query: api.requests.readAll() });
        //const authData: Maybe<{ auth: AuthR<Role> }> = cache.readQuery({ query: AuthRP.requests.read });
        //const roles: any[] = authData && authData.auth ? authData.auth.roles : ['PUBLIC'];

        // if (!navsData) return [];

        // const dtos: Nav[] = navsData.navs.filter(({parent}) => parent === where.parent).map((nav)=>);// && nHasIntersection(nav.roles || [], roles))

        // return dtos;

        return navsData
          ? navsData.navs
              .filter((nav) => nav.parent === where.parent) // && nHasIntersection(nav.roles || [], roles))
              .concat()
              .sort((a, b) => (a.order > b.order ? 1 : a.order < b.order ? -1 : 0))
          : [];
      },
    },
  };
}
