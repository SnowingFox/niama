import { mapValues } from '@niama/core';

import * as T from './types';

// METHODS =================================================================================================================================

export function capFromGrant<Dto, Role extends string>(dto: Dto, grant: T.Grant<Dto, Role>): Role[] {
  return Array.isArray(grant) ? grant : grant(dto);
}

export function capsFromGrants<Dto, Role extends string>(dto: Dto, grants: T.Grants<Dto, Role>): T.Caps<Role> {
  return mapValues(grants, (grant) => capFromGrant(dto, grant));
}

export function getCapsD<Role extends string>(): T.Caps<Role> {
  return { canDelete: [], canRead: [], canUpdate: [], canUpdateStatus: [] };
}
