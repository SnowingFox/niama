import { Maybe } from '@niama/core';
import { OrmE, OrmNames, OrmR, OrmTimeNames } from '@niama/orm';

// PROPS ===================================================================================================================================

export type NavNames = OrmNames | 'exact' | 'icon' | 'order' | 'parent' | 'to';

// NAV OBJECTS =============================================================================================================================

export interface NavE<Role extends string = string> extends OrmE<Role> {
  exact: boolean;
  icon: Maybe<string>;
  order: number;
  parent: string;
  to: string;
}

export interface NavR<Role extends string = string> extends OrmR<Role>, Omit<NavE<Role>, OrmTimeNames> {}

export interface NavMenu<Role extends string = string> extends Omit<NavMenuItem<Role>, 'exact'> {
  children: NavMenuItem<Role>[];
}

export interface NavMenuItem<Role extends string = string> {
  authenticated?: boolean;
  authorized?: Role[];
  children?: NavMenuItem<Role>[];
  exact?: boolean;
  icon?: string;
  id: string;
  to: string;
}

export type NavMenuFragments = Record<string, string>;
export type NavMenuLabels = Record<string, string>;

// NAV REQUESTS ============================================================================================================================

export type NavOB = any;
export interface NavW { parent: string };