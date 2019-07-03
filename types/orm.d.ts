import * as AP from './api';
import * as AU from './auth';
import * as C from './core';
import * as EX from './externals';
import * as F from './fela';

// import * as I from './importer';

// ORM MAIN ================================================================================================================================

export type Orm<N extends OrmNexus = OrmNexus, P extends OrmPrisma = OrmPrisma> = {
  Nexus: N;
  Prisma: P;
};

export type OrmNexus<R = any> = {
  Read: R;
};

export type OrmPrisma<C = any, OB = any, R = any, S = any, SW = any, U = any, W = any, WU = any> = {
  Create: C;
  OrderBy: OB;
  Read: R;
  Subscription: S;
  SubscriptionWhere: SW;
  Update: U;
  Where: W;
  WhereUnique: WU;
};

export type OrmRP<R = any, E extends OrmE = any, F extends AP.ApiF = any, W = any, OB = any> = {
  Entity: E;
  Fields: F;
  OrderBy: OB;
  Resource: R;
  Where: W;
};

export type OrmConfig<F extends AP.ApiF> = AP.ApiConfig<F, OrmLabels, OrmRequests<F>>;

// ORM OBJECTS =============================================================================================================================

export interface OrmE<Role extends string = string> extends AP.ApiE, AU.AuthCaps<Role> {
  createdAt: C.Maybe<Date>;
  label: C.Maybe<string>;
  status: NPri.AuthStatus;
  updatedAt: C.Maybe<Date>;
}

export interface OrmR<Role extends string = string> extends AP.ApiR, C.Omit<OrmE<Role>, OrmTimeFNames> {
  createdAt: C.Maybe<string>;
  label: C.Maybe<string>;
  status: NPri.AuthStatus;
  updatedAt: C.Maybe<string>;
}

export interface OrmActions {
  count: () => Promise<number>;
  create: () => Promise<any>;
  delete: (id: string) => Promise<any>;
  deleteMany: (ids: string[]) => Promise<any>;
  exists: () => Promise<any>;
  read: () => Promise<any>;
  readMany: () => Promise<any>;
  update: () => Promise<any>;
}

// ORM FIELDS ==============================================================================================================================

export type OrmLabelFNames = 'label';
export type OrmStatusFNames = 'status';
export type OrmTimeFNames = 'createdAt' | 'updatedAt';

export type OrmFNames = AP.ApiRFNames | OrmLabelFNames | OrmStatusFNames | OrmTimeFNames | AU.AuthGrantNames;
export type OrmF = OrmFNames[];

// export type OrmEButR = OrmTimeFNames | AP.ApiTypeFNames;
// export type OrmFcButBcF = OrmStatusFNames;
// export type OrmButBcF = casp | AP.ApiIdFNames;
// export type OrmButBuF = OrmCapsFNames;

// ORM LABELS ==============================================================================================================================

export type OrmMainLabelNames = 'PLURAL' | 'SINGULAR';
export type OrmInputLabelNames = 'CI' | 'UI' | 'WI' | 'WUI';
export type OrmRequestLabelNames =
  | 'COUNT'
  | 'CREATE'
  | 'DELETE'
  | 'DELETE_MANY'
  | 'EXISTS'
  | 'READ'
  | 'READ_ALL'
  | 'READ_MANY'
  | 'UPDATE'
  | 'UPSERT';
export type OrmLabelsStrict = Record<OrmMainLabelNames | OrmInputLabelNames | OrmRequestLabelNames, string>;
export type OrmLabels<T extends string = string> = OrmLabelsStrict | OrmLabelsStrict & Record<T, string>;

// ORM REQUESTS ============================================================================================================================

export type OrmRequestSimpleNames = 'count' | 'create' | 'delete' | 'deleteMany' | 'exists' | 'update' | 'upsert';
export type OrmRequestComplexNames = 'read' | 'readAll' | 'readMany';
export type OrmRequestNames = OrmRequestSimpleNames | OrmRequestComplexNames;
export interface OrmRequests<F extends AP.ApiF> extends Record<OrmRequestSimpleNames, EX.DocumentNode> {
  read: (fields?: F) => EX.DocumentNode;
  readAll: (fields?: F) => EX.DocumentNode;
  readMany: (fields?: F, connection?: string) => EX.DocumentNode;
}

// ORM ARGS ================================================================================================================================

export interface OrmReadManyArgs<Where, OrderBy> {
  where?: Where;
  orderBy?: OrderBy;
  skip?: number;
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}

export interface OrmUpsertArgs<Create, Update, WhereUnique> {
  create: Create;
  update: Update;
  where: WhereUnique;
}

// ORM OBJECTS =============================================================================================================================

/*export interface OrmBC {
  label: string;
  status?: Pri.AuthStatus;
}

export type OrmBU = Partial<OrmBC>;

export type OrmFC = C.Omit<OrmBC, OrmFcButBcF>;

export type OrmI18N<FR extends OrmFR = OrmFR> = C.StringMap<C.Omit<FR, OrmCapsF | OrmTimeF>>;*/

// ORM TRANSFORMERS ========================================================================================================================

/*export interface OrmTransformers<
  BR extends OrmBR,
  FR extends OrmFR,
  BC extends OrmBC,
  BU extends OrmBU,
  FC extends OrmFC,
  IC = undefined,
  IT = undefined
> {
  brFr: (item: BR) => FR;
  fcBc: (item: FC) => BC;
  fcBu: (item: FC) => BU;
  frFc: (item: FR) => FC;
  frI18n: (item: FR) => OrmI18N<FR>;
  icBc?: (item: IC, terms?: IT) => BC;
  icBu?: (item: IC, terms?: IT) => BU;
  // irIc?: (importer: I.ImporterFR, row: string[], options?: any) => IC;
  manyBrFr: (items: BR[]) => FR[];
}*/

// ORM OPTIONS =============================================================================================================================

export interface OrmReadManyO<R, F, Where, OrderBy> {
  args?: OrmReadManyArgs<Where, OrderBy>;
  connection?: string;
  fields?: F;
  // query?: QueryRef<{ [selector: string]: R[] }>;
}

// ORM COMPONENTS ==========================================================================================================================

export interface OrmTableColumn {
  filterable?: boolean;
  label: string;
  prop: string;
  sortable?: boolean;
  styler?: F.Styler;
  template?: any;
  width?: string;
}
