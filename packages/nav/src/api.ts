import { getLabels, getRp, ormPoMinF, ormUseReadMany } from '@niama/orm';

import * as T from './types';
import { posFromMenus } from './utils';

// REPOSITORY ==============================================================================================================================

export const rp: T.Orm.Rp<T.Cfg> = getRp({
  singular: 'nav',
  F: { main: [...ormPoMinF, 'exact', 'group', 'icon', 'order', 'parent', 'to'] },
  local: true,
});

// LOCAL ===================================================================================================================================

export const getSeed = ({ menus, roles }: GetSeedP): T.State => ({ navs: posFromMenus({ menus, roles }) });

export const getRS = () => ({
  Query: {
    navs: (_: any, { where }: { where: any }, { cache }: { cache: T.Api.InMemoryCache }): T.Po[] => {
      const navsData: T.Maybe<{ navs: T.Po[] }> = cache.readQuery({ query: rp.O.readAll(rp.F.main) });
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
});

// USES ====================================================================================================================================

export const useReadMany = <Vo = T.Po, Dto = T.Po>(p: T.Orm.UseReadManyTypedP<T.Cfg, Vo, Dto>): T.Orm.UseReadManyR<Vo> =>
  ormUseReadMany<T.Cfg, Vo, Dto>({ rp, total: false, count: false, ...p });

export interface GetSeedP {
  menus: T.Menu[];
  roles?: {
    all: T.Auth.Role[];
    current: T.Auth.Role[];
  };
}
