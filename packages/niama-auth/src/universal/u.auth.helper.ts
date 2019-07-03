import { mapValues } from '@niama/core';

import statusDtos from './u.auth.content.statuses.json';

// API =====================================================================================================================================

export const labels: N.AuthLabels = {
  AUTHORIZED_ROLES: 'authAuthorizedRoles',
  ME: 'me',
  SELECTED_ROLE: 'authSelectedRole',
  SET_AUTHORIZED_ROLES: 'authSetAuthorizedRoles',
  SET_SELECTED_ROLE: 'authSetSelectedRole',
  TOKEN: 'authToken',
};

// ENUMS ===================================================================================================================================

export const statuses: NPri.AuthStatus[] = Object.keys(statusDtos) as NPri.AuthStatus[];

// I18N ====================================================================================================================================

export const statusesI18n: N.I18n<NPri.AuthStatus> = statusDtos;

// DEFAULTS ================================================================================================================================

export const signinDI: N.AuthSigninI = { password: '', username: '' };
export const signupDI: N.AuthSignupI = { email: '', firstNames: '', lastName: '', phone: '' };

// METHODS =================================================================================================================================

export function capFromGrant<R, Role extends string>(item: R, grant: N.AuthGrant<R, Role>): Role[] {
  return Array.isArray(grant) ? grant : grant(item);
}

export function capsFromGrants<R, Role extends string>(item: R, grants: N.AuthGrants<R, Role>): N.AuthCaps<Role> {
  return mapValues(grants, (grant) => capFromGrant(item, grant));
}

export function getCapsD<Role extends string>(): N.AuthCaps<Role> {
  return { canDelete: [], canRead: [], canUpdate: [], canUpdateStatus: [] };
}
