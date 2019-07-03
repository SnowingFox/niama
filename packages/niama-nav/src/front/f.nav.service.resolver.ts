import { resourcesFromMenus } from '../universal/u.nav.helper';
import { api } from './f.nav.helper';

export function getInitialData<Role extends string>(menus: N.NavMenu<Role>[], auth: N.Maybe<N.AuthToken<Role>> = null): { navs: N.NavR[] } {
  return { navs: resourcesFromMenus(menus) };
}

export function getRS<Role extends string>() {
  return {
    Query: {
      navs: (_: any, { where }: { where: any }, { cache }: { cache: N.InMemoryCache }): N.NavR[] => {
        const navsData: N.Maybe<{ navs: N.NavR[] }> = cache.readQuery({ query: api.requests.readAll() });
        //const authData: N.Maybe<{ auth: N.AuthR<Role> }> = cache.readQuery({ query: AuthRP.requests.read });
        //const roles: any[] = authData && authData.auth ? authData.auth.roles : ['PUBLIC'];

        // if (!navsData) return [];

        // const dtos: N.Nav[] = navsData.navs.filter(({parent}) => parent === where.parent).map((nav)=>);// && nHasIntersection(nav.roles || [], roles))

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
