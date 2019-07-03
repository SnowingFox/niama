import * as AU from './auth';
import * as C from './core';
import * as O from './orm';

// NAV MAIN ================================================================================================================================

export type NavRP<Role extends string = string> = O.OrmRP<NavR<Role>, Nav<Role>, NavF, NavW, NavOB>;

// NAV OBJECTS =============================================================================================================================

export interface Nav<Role extends string = string> extends O.OrmE<Role> {
  exact: boolean;
  icon: N.Maybe<string>;
  order: number;
  parent: string;
  to: string;
}

export interface NavR<Role extends string = string> extends O.OrmR<Role>, C.Omit<Nav<Role>, O.OrmTimeFNames> {}

export interface NavMenu<Role extends string = string> extends C.Omit<NavMenuItem<Role>, 'exact'> {
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

// NAV FIELDS ==============================================================================================================================

export type NavFNames = O.OrmFNames | 'exact' | 'icon' | 'order' | 'parent' | 'to';
export type NavF = NavFNames[];

// NAV REQUESTS ============================================================================================================================

export type NavOB = any;
export type NavW = { parent: string };
