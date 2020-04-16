import * as Api from '@niama/api/types';
import * as Auth from '@niama/auth/types';
import { Dict, Maybe } from '@niama/core/types';
import * as Orm from '@niama/orm/types';

// CONFIG ==================================================================================================================================

export type Cfg = Orm.Cfg<ObjectsCfg, FieldCfg, OpsCfg>;

// FIELDS ==================================================================================================================================

export type FieldCfg = Api.FieldCfg<F, SF, undefined, undefined>;
export type SF = K[];
export type F = SF;

export type K = Orm.K | 'exact' | 'group' | 'icon' | 'order' | 'parent' | 'to';

// OPS =====================================================================================================================================

export type OpsCfg = Orm.OpsCfg<W, OB, undefined, undefined>
export type OB = any;
export interface W {
  parent: string;
}

// OBJECTS =================================================================================================================================

export type ObjectsCfg = Orm.ObjectsCfg<Po>;
export interface Po extends Orm.Po {
  exact: boolean;
  group: Maybe<string>;
  icon: Maybe<string>;
  order: number;
  parent: string;
  to: string;
}

export interface Menu extends Omit<MenuItem, 'exact'> {
  children: MenuItem[];
}

export interface MenuItem {
  canRead?: Auth.Role[];
  children?: MenuItem[];
  exact?: boolean;
  group?: string;
  icon?: string;
  id: string;
  to: string;
}

export interface MenuParent {
  canRead?: Auth.Role[];
  id: string;
  to: string;
}

export type MenuFragments = Dict;
export type MenuLabels = Dict;

export interface State {
  navs: Po[];
}
