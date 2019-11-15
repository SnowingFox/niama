import { getRequests, OrmConfig, OrmRequests, resourceMinF } from '@niama/orm-client';

import { postLabels } from './post.helper';
import { PostF } from './post.types';

const fields: PostF = [...resourceMinF, 'category', 'content', 'image'];
const requests: OrmRequests<PostF> = getRequests<PostF>(fields, postLabels, false);

export const postApi: OrmConfig<PostF> = { fields, labels: postLabels, requests };
