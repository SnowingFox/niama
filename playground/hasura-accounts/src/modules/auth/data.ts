import * as T from '@/hasura-accounts/types';

export const roles: T.Auth.Role[] = ['ADMIN', 'MEMBER', 'PUBLIC'];
export const defaultRoles: T.Auth.Role[] = ['MEMBER'];
