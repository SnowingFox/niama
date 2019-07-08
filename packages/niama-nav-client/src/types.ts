import { Nav, NavNames, NavOB, NavR, NavW } from '@niama/nav';
import { OrmRPO } from '@niama/orm-client';

// MAIN ====================================================================================================================================

export type NavRPO<Role extends string = string> = OrmRPO<NavR<Role>, Nav<Role>, NavF, NavW, NavOB>;

// FIELDS ==================================================================================================================================

export type NavF = NavNames[];
