import * as Api from '@niama/api/types';
import * as Auth from '@niama/auth/types';
import { Maybe } from '@niama/core/types';

// CONFIG ==================================================================================================================================

export interface Config<IDto extends Dto = any, F extends Api.F = any, W = any, OB = any> {
  Fields: F;
  OrderBy: OB;
  Dto: IDto;
  Where: W;
}

// NAMING ==================================================================================================================================

export type NamesStatus = 'status';
export type NamesTime = 'createdAt' | 'updatedAt';
export type NamesD = NamesStatus | NamesTime | Auth.GrantNames;
export type Names = Api.Names | NamesD;

// OBJECTS =================================================================================================================================

export interface Dto<Role extends string = string> extends Api.Dto, Omit<Vo<Role>, NamesTime> {
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface Vo<Role extends string = string> extends Api.Vo, Auth.Caps<Role> {
  createdAt: Maybe<Date>;
  status: Auth.Status;
  updatedAt: Maybe<Date>;
}

export type F = Names[];

export type OpNamesComplex = 'readAll' | 'readMany' | 'readOne';
export type OpNamesSimple = 'count' | 'create' | 'deleteMany' | 'deleteOne' | 'exists' | 'update' | 'upsert';
export type OpNames = OpNamesComplex | OpNamesSimple;
export type Ops<Fi extends Api.F, Extra extends string = string> = Record<OpNamesSimple, Api.DocumentNode> &
  Record<OpNamesComplex, DocumentNodeFactory<Fi>> &
  Partial<Record<Extra, Api.DocumentNode | DocumentNodeFactory<Fi>>>;

export type DocumentNodeFactory<Fi extends Api.F> = (p?: GetDocumentNodeP<Fi>) => Api.DocumentNode;



export interface RP<C extends Config> extends Api.RP<Labels, Ops<C['Fields']>> {
  fields: C['Fields'];
}

export interface Actions {
  count: () => Promise<number>;
  create: () => Promise<any>;
  deleteMany: (ids: string[]) => Promise<any>;
  deleteOne: (id: string) => Promise<any>;
  exists: () => Promise<any>;
  readMany: () => Promise<any>;
  readOne: () => Promise<any>;
  update: () => Promise<any>;
}

// LABELS ==================================================================================================================================

export type LabelsNamesInput = 'CI' | 'OB' | 'UI' | 'WI' | 'WUI';
export type LabelsNamesMain = 'PLURAL' | 'SINGULAR' | 'TYPE';
export type LabelsNamesRequest =
  | 'COUNT'
  | 'CREATE'
  | 'DELETE_MANY'
  | 'DELETE_ONE'
  | 'EXISTS'
  | 'READ_MANY'
  | 'READ_ONE'
  | 'UPDATE'
  | 'UPSERT';
export type LabelsStrict = Record<LabelsNamesInput | LabelsNamesMain | LabelsNamesRequest, string>;
export type Labels<T extends string = string> = LabelsStrict | LabelsStrict & Record<T, string>;

export interface GetLabelsP<Other extends string> {
  singular: string;
  other?: Record<Other, string>;
}

// PARAMS ==================================================================================================================================

export interface GetDocumentNodeP<Fi extends Api.F> {
  alias?: Api.OpAlias;
  fields?: Fi;
}

export interface GetOpsP<Fi extends Api.F, Extra extends string = string> {
  extra?: Record<Extra, Api.DocumentNode | DocumentNodeFactory<Fi>>;
  fields: Fi;
  labels: Labels;
  local?: boolean;
  rest?: boolean | Partial<Record<OpNames, Api.OpRest | string>>;
}

// ARGS ====================================================================================================================================

export interface ReadManyArgs<Where, OrderBy> {
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
}
