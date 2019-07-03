import { getLabels } from '@niama/orm';

import roleDtos from './u.user.content.roles.json';

// API =====================================================================================================================================

export const labels: N.OrmLabels = getLabels('user', { READ_ME: 'me' });

// ENUMS ===================================================================================================================================

export const roles: Pri.UserRole[] = Object.keys(roleDtos) as Pri.UserRole[];

// I18N ====================================================================================================================================

export const rolesI18n: N.I18n<Pri.UserRole> = roleDtos;

// ROLE ====================================================================================================================================

export const iamAdmin = (role: Pri.UserRole) => role === 'ADMIN';
export const iamManager = (role: Pri.UserRole) => role === 'MANAGER';
export const iamSuperAdmin = (role: Pri.UserRole) => role === 'SUPER_ADMIN';
export const iamAtLeastManager = (role: Pri.UserRole) => iamSuperAdmin(role) || iamAdmin(role) || iamManager(role);
