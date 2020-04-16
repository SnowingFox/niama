export * from './api';
export { rp as authRp } from './api';

export * from './boot';
export * from './i18n.en';
export * from './i18n.fr';

export * from './i18n.statuses';
export { statuses as authStatuses, statusesEn as authStatusesEn, statusesFr as authStatusesFr } from './i18n.statuses';

export * from './services';
export * from './uses';

export * from './utils';
export { getError as getAuthError, header as authHeader } from './utils';

export { en as authEn } from './i18n.en';
export { fr as authFr } from './i18n.fr';
