import { getLabels, getOps } from '@niama/orm/hasura';

import * as T from '@/hasura-accounts/types';

export const labels: T.Orm.Labels = getLabels({ singular: 'post' });
export const fields: T.Post.F = ['content', 'id', 'title'];

export const ops: T.Orm.Ops<T.Post.F> = getOps({ fields, labels });

export const rp: T.Post.RP = { fields, labels, ops };

/*export function useMany<Vo = T.Post.Dto, Dto extends object = T.Post.Dto>(p: T.Post.UseManyP<Vo, Dto>): T.Orm.UseManyR<Vo> {
  return ormUseMany({ rp, total: false, count: false, ...p });
}*/
