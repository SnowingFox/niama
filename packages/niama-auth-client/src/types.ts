import { ApiF } from '@niama/api-client';
import { AuthTokenNames, AuthTokenR } from '@niama/auth';
import { Maybe } from '@niama/core';
import { DocumentNode } from 'graphql';

// APOLLO ==================================================================================================================================

export interface AuthCacheData<Role extends string = string> {
  authAuthorizedRoles: Role[];
  authSelectedRole: Maybe<Role>;
  authToken: Maybe<AuthTokenR>;
}

// FIELDS ==================================================================================================================================

export type AuthTokenF = AuthTokenNames[];

// REQUESTS ================================================================================================================================

export type AuthRequestSimpleNames = 'authorizedRoles' | 'selectedRole' | 'setAuthorizedRoles' | 'setSelectedRole' | 'token';
export type AuthRequestComplexNames = 'me';
export type AuthRequestNames = AuthRequestSimpleNames | AuthRequestComplexNames;
export interface AuthRequests<UserF extends ApiF = U.UserF> extends Record<AuthRequestSimpleNames, DocumentNode> {
  me: (fields?: UserF) => DocumentNode;
}

// BOOT ====================================================================================================================================

export interface AuthBootO {
  authenticatedUri?: string;
  signinUri?: string;
}