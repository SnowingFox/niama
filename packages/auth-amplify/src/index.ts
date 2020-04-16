/*export * from '@niama/auth/src/api';
export * from '@niama/auth/src/uses';

export * from '@niama/auth/src/utils';
export { getError as getAuthError } from '@niama/auth/src/utils';*/

export * from '../../auth/src/api';
export * from '../../auth/src/uses';

export * from '../../auth/src/utils';
export { getError as getAuthError } from '../../auth/src/utils';

export * from './boot';

export * from './utils';
export { addressFromPayload as addressFromAuthPayload, payloadAttrsFromAddress as authPayloadAttrsFromAddress } from './utils';
