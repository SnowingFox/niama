import { ormUseReadMany, ormUseReadOne } from '@niama/orm';
import { getRp } from '@niama/orm-hasura';

import * as T from '@/hasura-accounts/types';

// REPOS ===================================================================================================================================

export const rp: T.Orm.Rp<T.Post.Cfg> = getRp({ singular: 'post', F: { main: ['content', 'id', 'title'] } });

// USES ====================================================================================================================================

export const useReadMany = <Vo = T.Post.Po, Dto = T.Post.Po>(p?: T.Post.UseReadManyP<Vo, Dto>): T.Orm.UseReadManyR<Vo> =>
  ormUseReadMany({ rp, ...p });

export const useReadOne = <Vo = T.Post.Po, Dto = T.Post.Po>(p: T.Post.UseReadOneP<Vo, Dto>): T.Orm.UseReadOneR<Vo> =>
  ormUseReadOne({ rp, ...p });
