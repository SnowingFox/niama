import * as AP from './api';
import * as C from './core';
import * as EX from './externals';
import * as U from './user';

// RESOURCES / ENTITIES ====================================================================================================================

export interface AuthToken<Role extends string = string> extends AP.ApiE {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  roles: Role[];
}

export interface AuthTokenR<Role extends string = string> extends AuthToken<Role>, AP.ApiR {}

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

// FIELDS ==================================================================================================================================

export type AuthTokenFNames = AP.ApiRFNames | 'aud' | 'exp' | 'iat' | 'iss' | 'roles';
export type AuthTokenF = AuthTokenFNames[];

// REQUESTS ================================================================================================================================

export type AuthRequestSimpleNames = 'authorizedRoles' | 'selectedRole' | 'setAuthorizedRoles' | 'setSelectedRole' | 'token';
export type AuthRequestComplexNames = 'me';
export type AuthRequestNames = AuthRequestSimpleNames | AuthRequestComplexNames;
export interface AuthRequests<UserF extends AP.ApiF = U.UserF> extends Record<AuthRequestSimpleNames, EX.DocumentNode> {
  me: (fields?: UserF) => EX.DocumentNode;
}

// GRANTS ==================================================================================================================================

export type AuthCaps<Role extends string = string> = Record<AuthGrantNames, Role[]>;
export type AuthGrant<Resource, Role extends string> = Role[] | ((item: Resource) => Role[]);
export type AuthGrantNames = 'canDelete' | 'canRead' | 'canUpdate' | 'canUpdateStatus';
export type AuthGrants<Resource, Role extends string> = Record<AuthGrantNames, AuthGrant<Resource, Role>>;

// APOLLO ==================================================================================================================================

export interface AuthCacheData<Role extends string = string> {
  authAuthorizedRoles: Role[];
  authSelectedRole: C.Maybe<Role>;
  authToken: C.Maybe<AuthTokenR>;
}

// BOOT ====================================================================================================================================

export interface AuthBootO {
  authenticatedUri?: string;
  signinUri?: string;
}
