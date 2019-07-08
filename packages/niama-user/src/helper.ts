import { I18n } from '@niama/core';
import { getLabels, OrmLabels } from '@niama/orm';

import roleDtos from './content.roles.json';

// API =====================================================================================================================================

export const labels: OrmLabels = getLabels('user', { READ_ME: 'me' });

// ENUMS ===================================================================================================================================

export const roles: Pri.UserRole[] = Object.keys(roleDtos) as Pri.UserRole[];

// I18N ====================================================================================================================================

export const rolesI18n: I18n<Pri.UserRole> = roleDtos;

// ROLE ====================================================================================================================================

export const iamAdmin = (role: Pri.UserRole) => role === 'ADMIN';
export const iamManager = (role: Pri.UserRole) => role === 'MANAGER';
export const iamSuperAdmin = (role: Pri.UserRole) => role === 'SUPER_ADMIN';
export const iamAtLeastManager = (role: Pri.UserRole) => iamSuperAdmin(role) || iamAdmin(role) || iamManager(role);
