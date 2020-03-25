import * as Api from '@niama/api/types';
import { Maybe, Syncer } from '@niama/core/types';

// REPO ====================================================================================================================================

export type Rp = Api.Rp<Labels, Ops>;

// OPS =====================================================================================================================================

export type OpK = 'read';
export type Ops = Record<OpK, Api.DocumentNode>;

// FIELDS ==================================================================================================================================

export type SF = K[];
export type F = SF;

export type K = keyof Po;

// LABELS ==================================================================================================================================

export type Labels = Record<OpK, string>;

// OBJECTS =================================================================================================================================

export interface Po extends Omit<Api.Po, 'id'> {
  accessToken: Maybe<string>;
  role: Role;
  roles: Role[];
}

export interface AuthorizationHeader {
  Authorization: string;
}

// KEYS ====================================================================================================================================

export type GrantK = 'canDelete' | 'canRead' | 'canUpdate' | 'canUpdateStatus';

// CONSTANTS ===============================================================================================================================

export type Role = 'MEMBER' | 'PUBLIC';
export type Status = 'BLOCKED' | 'INCORRECT' | 'OK' | 'PENDING';

// GRANTS ==================================================================================================================================

export type Caps = Record<GrantK, Role[]>;
export type Grant<Po> = Role[] | Syncer<Role[], Po>;
export type Grants<Po> = Record<GrantK, Grant<Po>>;
