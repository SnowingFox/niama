import { getError as baseGetError } from '@niama/core';

// ERROR ===================================================================================================================================

export const getError = (id: string): Error => baseGetError({ id, type: 'user' });
