import { getLabels, OrmLabels } from '@niama/orm';

import { PostCategory } from './post.types';

// API =====================================================================================================================================

export const postLabels: OrmLabels = getLabels('post');

// ENUMS ===================================================================================================================================

export const postCategories: PostCategory[] = ['COMPUTER_SCIENCE', 'LITERATURE', 'POLITICS', 'RELIGION'];
