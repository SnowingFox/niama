import * as Api from '@niama/api/types';
import * as Orm from '@niama/orm/types';

// CONFIG =================================================================================================================================

export type Cfg = Orm.Cfg<ObjectsCfg, FieldCfg, OpsCfg>;

// FIELDS ==================================================================================================================================

export type FieldCfg = Api.FieldCfg<F, SF, undefined, undefined>;
export type F = SF;
export type SF = K[];
export type K = 'content' | 'id' | 'title';

// OPS =====================================================================================================================================

export type OpsCfg = Orm.OpsCfg<W, OB, undefined, undefined>;

export type OB = any;
export type W = any;

// OBJECTS =================================================================================================================================

export type ObjectsCfg = Orm.ObjectsCfg<Po, Create>;

export interface Po extends Orm.Po {
  content: string;
  title: string;
}

export interface Create {
  content: string;
  title: string;
}

// USES ====================================================================================================================================

export type UseReadManyP<Vo = Po, Dto = Po> = Orm.UseReadManyTypedP<Cfg, Vo, Dto>;
export type UseReadOneP<Vo = Po, Dto = Po> = Orm.UseReadOneTypedP<Cfg, Vo, Dto>;

// CONSTANTS ===============================================================================================================================

export type Category = 'COMPUTER SCIENCE' | 'SPIRITUALITY' | 'POLITICS';