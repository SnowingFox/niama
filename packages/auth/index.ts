export * from './src/api';
export { rp as authRp } from './src/api';

export * from './src/boot';
export * from './src/i18n.en';
export * from './src/i18n.fr';

export * from './src/i18n.statuses';
export { statuses as authStatuses, statusesEn as authStatusesEn, statusesFr as authStatusesFr } from './src/i18n.statuses';

export * from './src/services';
export * from './src/uses';

export * from './src/utils';
export { getError as getAuthError, header as authHeader } from './src/utils';

export { en as authEn } from './src/i18n.en';
export { fr as authFr } from './src/i18n.fr';
