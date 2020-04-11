import * as Api from '@niama/api/types';
import * as Auth from '@niama/auth/types';
import { Maybe, Opt, SagaCfg } from '@niama/core/types';

// CONFIG ==================================================================================================================================

export type Cfg<ObC extends ObjectsCfg = any, FiC extends Api.FieldCfg = any, OpC extends OpsCfg = any> = {
  ExL: OpC['E'];
  FiC: FiC;
  ObC: ObC;
  OpC: OpC;
};

export type OpCfg<C extends Cfg = any, Src = any, Res = any, Done = Res, Fail = any, Extra = {}> = SagaCfg<
  Src,
  Res,
  Done,
  Fail,
  { rp: Rp<C> } & Extra
>;

// LABELS ==================================================================================================================================

export type LabelsInputK = 'createI' | 'orderBy' | 'updateI' | 'whereI' | 'whereUI';
export type LabelsMainK = 'plural' | 'singular' | 'type';
export type LabelsRequestK = 'count' | 'create' | 'deleteMany' | 'deleteOne' | 'exists' | 'readMany' | 'readOne' | 'update' | 'upsert';
export type LabelsStrict = Record<LabelsInputK | LabelsMainK | LabelsRequestK, string>;
export type Labels<C extends Cfg> = C['ExL'] extends string ? LabelsStrict & Record<C['ExL'], string> : LabelsStrict;

// FIELDS ==================================================================================================================================

export type SF = K[];
export type F = SF;

export type StatusK = 'status';
export type TimeK = 'createdAt' | 'updatedAt';
export type DefaultK = StatusK | TimeK | Auth.GrantK;
export type K = Api.K | DefaultK;

// OPS =====================================================================================================================================

export type OpsCfg<W = any, OB = any, EF extends Opt<string> = any, ED extends Opt<string> = any> = {
  E: ED | EF extends string ? ED | EF : ED extends string ? ED : EF;
  ED: ED;
  EF: EF;
  OB: OB;
  W: W;
};

export type Ops<C extends Cfg> = C['ExL'] extends undefined
  ? OpsStrict<C>
  : C['OpC']['ED'] extends undefined
  ? OpsStrict<C> & OpsF<C['OpC']['EF'], C['FiC']['F']>
  : C['OpC']['EF'] extends undefined
  ? OpsStrict<C> & OpsD<C['OpC']['ED']>
  : OpsStrict<C> & OpsF<C['OpC']['EF'], C['FiC']['F']> & OpsD<C['OpC']['ED']>;

type OpsStrict<C extends Cfg> = OpsD<OpDK> & OpsF<OpFK, C['FiC']['F']>;
type OpsD<K extends string> = Record<K, Api.DocumentNode>;
type OpsF<K extends string, F extends Api.F> = Record<K, DocumentNodeFactory<F>>;

export type OpFK = 'create' | 'readAll' | 'readMany' | 'readOne' | 'update' | 'upsert';
export type OpDK = 'count' | 'deleteMany' | 'deleteOne' | 'exists';
export type OpK = OpDK | OpFK;

type OpsExtra<C extends Cfg, Less extends Opt<string> = undefined> = Exclude<C['ExL'], Less> extends Opt<never>
  ? undefined
  : Exclude<C['OpC']['ED'], Less> extends Opt<never>
  ? OpsExtraF<C, Less>
  : Exclude<C['OpC']['EF'], Less> extends Opt<never>
  ? OpsExtraD<C, Less>
  : OpsExtraF<C, Less> & OpsExtraD<C, Less>;

type OpsExtraF<C extends Cfg, Less extends Opt<string> = undefined> = { factories: Record<Exclude<C['OpC']['EF'], Less>, Api.GetOpP> };
type OpsExtraD<C extends Cfg, Less extends Opt<string> = undefined> = { docs: Record<Exclude<C['OpC']['ED'], Less>, Api.GetOpP> };

// OBJECTS =================================================================================================================================

export type ObjectsCfg<Po = any, Create = any> = {
  Create: Create;
  Po: Po;
};

export interface Po extends Api.Po, Omit<Vo, TimeK> {
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface Vo extends Api.Vo, Auth.Caps {
  createdAt: Maybe<Date>;
  status: Auth.Status;
  updatedAt: Maybe<Date>;
}

export type DocumentNodeFactory<Fi extends Api.F> = (p?: Fi | GetDocumentNodeP<Fi>) => Api.DocumentNode;

export interface Rp<C extends Cfg> extends Api.Rp<Labels<C>, Ops<C>> {
  F: Api.Fields<C['FiC']>;
}

// PARAMS ==================================================================================================================================

export interface GetDocumentNodeP<Fi extends Api.F> {
  alias?: Api.OpAlias;
  fields?: Fi;
}

type GetLabelStrictP = { singular: string };
export type GetLabelsP<C extends Cfg> = C['ExL'] extends string
  ? GetLabelStrictP & { extra: Record<C['ExL'], string> }
  : GetLabelStrictP & { extra?: never };

interface GetOpsStrictP<C extends Cfg> {
  F: Api.Fields<C['FiC']>;
  L: Labels<C>;
  local?: boolean;
  rest?: boolean | Partial<Record<OpK, Api.OpRest | string>>;
}
export type GetOpsP<C extends Cfg> = C['ExL'] extends string
  ? GetOpsStrictP<C> & { extra?: OpsExtra<C> }
  : GetOpsStrictP<C> & { extra?: never };

interface GetRpStrictP<C extends Cfg> {
  F: Api.Fields<C['FiC']>;
  local?: boolean;
  rest?: boolean | Partial<Record<OpK, Api.OpRest | string>>;
  singular: string;
}
export type GetRpP<C extends Cfg, Less extends Opt<string> = undefined> = Exclude<C['ExL'], Less> extends Opt<never>
  ? GetRpStrictP<C> & { extra?: never }
  : GetRpStrictP<C> & { extra: OpsExtra<C, Less> };

// ARGS ====================================================================================================================================

/*export interface ReadManyArgs<Where, OrderBy> {
  where?: Where;
  orderBy?: OrderBy;
  skip?: number;
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}

export interface UpsertArgs<Create, Update, WhereUnique> {
  create: Create;
  update: Update;
  where: WhereUnique;
}*/
