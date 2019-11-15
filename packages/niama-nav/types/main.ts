import { Maybe } from '@niama/core/types';
import * as Orm from '@niama/orm/types';

// CONFIG ==================================================================================================================================

export type Config<Role extends string = string> = Orm.Config<Dto<Role>, F, W, OB>;

// NAMING ==================================================================================================================================

export type Names = Orm.Names | 'exact' | 'group' | 'icon' | 'order' | 'parent' | 'to';

// OBJECTS =================================================================================================================================

export interface Dto<Role extends string = string> extends Orm.Dto<Role> {
  exact: boolean;
  group: Maybe<string>;
  icon: Maybe<string>;
  order: number;
  parent: string;
  to: string;
}

export type F = Names[];

export interface Menu<Role extends string = string> extends Omit<MenuItem<Role>, 'exact'> {
  children: MenuItem<Role>[];
}

export interface MenuItem<Role extends string = string> {
  canRead?: Role[];
  children?: MenuItem<Role>[];
  exact?: boolean;
  group?: string;
  icon?: string;
  id: string;
  to: string;
}

export interface MenuParent<Role extends string = string> {
  canRead?: Role[];
  id: string;
  to: string;
}

export type MenuFragments = Record<string, string>;
export type MenuLabels = Record<string, string>;

export interface State {
  navs: Dto[];
}

// REQUESTS ================================================================================================================================

export type OB = any;
export interface W {
  parent: string;
}
