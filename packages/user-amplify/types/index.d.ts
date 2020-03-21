import * as Api from '@niama/api/types';
import * as Orm from '@niama/orm/types';
import * as Base from '@niama/user/types';

declare module '@niama/user/types' {
  interface Po {
    emailVerified: boolean;
  }

  /*interface Vo {
    emailVerified: boolean;
  }*/
}

export * from '@niama/user/types';

// CONFIG ==================================================================================================================================

export type Cfg = Orm.Cfg<Base.ObjectsCfg, FieldCfg, Base.OpsCfg>;

// FIELDS ==================================================================================================================================

export type FieldCfg = Api.FieldCfg<F, SF, undefined, undefined>;
export type SF = K[];
export type F = SF;

export type K = Base.K | 'emailVerified';
export type DefaultK = Base.DefaultK | 'emailVerified';