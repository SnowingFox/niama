import { mutation, query, resourceF } from '@niama/api/front';
import { decode } from 'jsonwebtoken';
import { Cookies } from 'quasar';

import { AuthToken } from '../universal/u.auth-token.model.entity';
import { labels } from '../universal/u.auth.helper';

// API =====================================================================================================================================

const fields: N.AuthTokenF = [...resourceF, 'aud', 'exp', 'iat', 'iss', 'roles'];
const requests: N.AuthRequests = {
  authorizedRoles: query([{ remote: false, selector: labels.AUTHORIZED_ROLES }]),
  me: (fields) => query([{ fields, remote: true, selector: labels.ME }]),
  selectedRole: query([{ remote: false, selector: labels.SELECTED_ROLE }]),
  setAuthorizedRoles: mutation([{ remote: false, selector: labels.SET_AUTHORIZED_ROLES, varTypes: { roles: '[UserRole]' } }]),
  setSelectedRole: mutation([{ remote: false, selector: labels.SET_SELECTED_ROLE, varTypes: { role: 'UserRole!' } }]),
  token: query([{ fields, remote: false, selector: labels.TOKEN }]),
};

export const api: N.ApiConfig<N.AuthTokenF, N.AuthLabels, N.AuthRequests> = { fields, labels, requests };

// UTILS ===================================================================================================================================

export function getToken<Role extends string>(): N.Maybe<AuthToken<Role>> {
  const accessCookie: string = process.env.AUTH_COOKIE_ACCESS || 'niama_access';
  return Cookies.has(accessCookie) ? new AuthToken<Role>(decode(Cookies.get(accessCookie)) as any) : null;
}
