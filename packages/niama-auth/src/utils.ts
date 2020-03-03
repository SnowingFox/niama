import { getError as baseGetError, mapValues } from '@niama/core';

import * as T from './types';

// MAPPERS =================================================================================================================================

export const header = (po: T.Po): T.Maybe<T.AuthorizationHeader> => (po.accessToken ? { Authorization: `Bearer ${po.accessToken}` } : null);
export const isAuthenticated = (po: T.Po): boolean => po.role !== 'PUBLIC';

// METHODS =================================================================================================================================

export const capFromGrant = <Dto>(dto: Dto, grant: T.Grant<Dto>): T.Role[] => (Array.isArray(grant) ? grant : grant(dto));
export const capsFromGrants = <Dto>(dto: Dto, grants: T.Grants<Dto>): T.Caps => mapValues(grants, (grant) => capFromGrant(dto, grant));
export const getCapsD = (): T.Caps => ({ canDelete: [], canRead: [], canUpdate: [], canUpdateStatus: [] });

// ERROR ===================================================================================================================================

export const getError = (id: string): Error => baseGetError({ id, type: 'auth' });
