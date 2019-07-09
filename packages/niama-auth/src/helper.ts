import { I18n, mapValues } from '@niama/core';

import statusDtos from './content.statuses.json';
import { AuthCaps, AuthGrant, AuthGrants, AuthLabels, AuthSigninI, AuthSignupI, AuthStatus } from './types';

// API =====================================================================================================================================

export const labels: AuthLabels = {
  AUTHORIZED_ROLES: 'authAuthorizedRoles',
  ME: 'me',
  SELECTED_ROLE: 'authSelectedRole',
  SET_AUTHORIZED_ROLES: 'authSetAuthorizedRoles',
  SET_SELECTED_ROLE: 'authSetSelectedRole',
  TOKEN: 'authToken',
};

// ENUMS ===================================================================================================================================

export const statuses: AuthStatus[] = Object.keys(statusDtos) as AuthStatus[];

// I18N ====================================================================================================================================

export const statusesI18n: I18n<AuthStatus> = statusDtos;

// DEFAULTS ================================================================================================================================

export const signinDI: AuthSigninI = { password: '', username: '' };
export const signupDI: AuthSignupI = { email: '', firstNames: '', lastName: '', phone: '' };

// METHODS =================================================================================================================================

export function capFromGrant<R, Role extends string>(item: R, grant: AuthGrant<R, Role>): Role[] {
  return Array.isArray(grant) ? grant : grant(item);
}

export function capsFromGrants<R, Role extends string>(item: R, grants: AuthGrants<R, Role>): AuthCaps<Role> {
  return mapValues(grants, (grant) => capFromGrant(item, grant));
}

export function getCapsD<Role extends string>(): AuthCaps<Role> {
  return { canDelete: [], canRead: [], canUpdate: [], canUpdateStatus: [] };
}
