import { getLabels, getOps, ormDtoMinF, ormUseMany } from '@niama/orm';

import { dtosFromMenus } from './helper';
import * as T from './types';

// REPOSITORY ==============================================================================================================================

export const labels: T.Orm.Labels = getLabels({ singular: 'nav' });
export const fields: T.F = [...ormDtoMinF, 'exact', 'group', 'icon', 'order', 'parent', 'to'];
export const ops: T.Orm.Ops<T.F> = getOps<T.F>({ fields, labels, local: true });
export const rp: T.Orm.RP<T.Config> = { fields, labels, ops };

// LOCAL ===================================================================================================================================

export function getInitialData<Role extends string>({ menus, roles }: GetInitialDataP<Role>): T.State {
  return { navs: dtosFromMenus({ menus, roles }) };
}

export function getRS<Role extends string>() {
  return {
    Query: {
      navs: (_: any, { where }: { where: any }, { cache }: { cache: T.Api.InMemoryCache }): T.Dto[] => {
        const navsData: T.Maybe<{ navs: T.Dto[] }> = cache.readQuery({ query: rp.ops.readAll() });
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

// USES ====================================================================================================================================

export function useMany<Vo = T.Dto, Dto extends object = T.Config['Dto']>(p: T.Orm.UseManyTypedP<T.Config, Vo, Dto>): T.Orm.UseManyR<Vo> {
  return ormUseMany<T.Config, Vo, Dto>({ rp, total: false, count: false, ...p });
}

export interface GetInitialDataP<Role extends string> {
  menus: T.Menu<Role>[];
  roles?: {
    all: Role[];
    current: Role[];
  };
}
