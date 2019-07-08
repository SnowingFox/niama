import { ApiConfig, mutation, query, resourceF } from '@niama/api-client';
import { AuthLabels, authLabels, AuthToken } from '@niama/auth';
import { Maybe } from '@niama/core';
import { decode } from 'jsonwebtoken';
import { Cookies } from 'quasar';

import { AuthRequests, AuthTokenF } from './types';

// API =====================================================================================================================================

const fields: AuthTokenF = [...resourceF, 'aud', 'exp', 'iat', 'iss', 'roles'];
const requests: AuthRequests = {
  authorizedRoles: query([{ remote: false, selector: authLabels.AUTHORIZED_ROLES }]),
  me: (fields) => query([{ fields, remote: true, selector: authLabels.ME }]),
  selectedRole: query([{ remote: false, selector: authLabels.SELECTED_ROLE }]),
  setAuthorizedRoles: mutation([{ remote: false, selector: authLabels.SET_AUTHORIZED_ROLES, varTypes: { roles: '[UserRole]' } }]),
  setSelectedRole: mutation([{ remote: false, selector: authLabels.SET_SELECTED_ROLE, varTypes: { role: 'UserRole!' } }]),
  token: query([{ fields, remote: false, selector: authLabels.TOKEN }]),
};

export const api: ApiConfig<AuthTokenF, AuthLabels, AuthRequests> = { fields, labels: authLabels, requests };

// UTILS ===================================================================================================================================

export function getToken<Role extends string>(): Maybe<AuthToken<Role>> {
  const accessCookie: string = process.env.AUTH_COOKIE_ACCESS || 'niama_access';
  return Cookies.has(accessCookie) ? new AuthToken<Role>(decode(Cookies.get(accessCookie)) as any) : null;
}
