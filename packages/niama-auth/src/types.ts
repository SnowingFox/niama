import { ApiE, ApiR, ApiRNames } from '@niama/api';

// PROPS ===================================================================================================================================

export type AuthTokenNames = ApiRNames | 'aud' | 'exp' | 'iat' | 'iss' | 'roles';

// RESOURCES / ENTITIES ====================================================================================================================

export interface AuthTokenE<Role extends string = string> extends ApiE {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  roles: Role[];
}

export interface AuthTokenR<Role extends string = string> extends AuthTokenE<Role>, ApiR {}

// INPUTS ==================================================================================================================================

export interface AuthSigninI {
  password: string;
  username: string;
}

export interface AuthSignupI {
  email: string;
  firstNames: string;
  lastName: string;
  phone: string;
}

// LABELS ==================================================================================================================================

export type AuthLabelNames = 'AUTHORIZED_ROLES' | 'ME' | 'SELECTED_ROLE' | 'SET_AUTHORIZED_ROLES' | 'SET_SELECTED_ROLE' | 'TOKEN';
export type AuthLabels = Record<AuthLabelNames, string>;

// GRANTS ==================================================================================================================================

export type AuthCaps<Role extends string = string> = Record<AuthGrantNames, Role[]>;
export type AuthGrant<Resource, Role extends string> = Role[] | ((item: Resource) => Role[]);
export type AuthGrantNames = 'canDelete' | 'canRead' | 'canUpdate' | 'canUpdateStatus';
export type AuthGrants<Resource, Role extends string> = Record<AuthGrantNames, AuthGrant<Resource, Role>>;
