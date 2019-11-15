import { getLabels, getOperations, resourceMinF } from '@niama/orm';
import { getUseCount, readMany as ormReadMany } from '@niama/orm-client';

import { Post } from './post.mdl';

export const labels: C.Orm.Labels = getLabels({ singular: 'post' });
export const fields: C.Post.F = [...resourceMinF, 'category', 'content', 'image'];
export const operations: C.Orm.Operations<C.Post.F> = getOperations<C.Post.F>({ fields, labels, rest: true });

export const rp: C.Orm.RP<C.Post.Config> = { fields, labels, operations, model: Post };

export function readMany<I>(p: Omit<C.Orm.ReadManyP<C.Post.Config, I>, 'rp'>) {
  return ormReadMany({ ...p, rp });
}

export const useCount = getUseCount(rp);