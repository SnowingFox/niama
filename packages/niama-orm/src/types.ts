import { ApiE, ApiR, ApiRNames } from '@niama/api';
import { AuthCaps, AuthGrantNames, AuthStatus } from '@niama/auth';
import { Maybe } from '@niama/core';

// ORM PROPS ==============================================================================================================================

export type OrmLabelNames = 'label';
export type OrmStatusNames = 'status';
export type OrmTimeNames = 'createdAt' | 'updatedAt';
export type OrmNames = ApiRNames | OrmLabelNames | OrmStatusNames | OrmTimeNames | AuthGrantNames;

// ORM OBJECTS =============================================================================================================================

export interface OrmE<Role extends string = string> extends ApiE, AuthCaps<Role> {
  createdAt: Maybe<Date>;
  label: Maybe<string>;
  status: AuthStatus;
  updatedAt: Maybe<Date>;
}

export interface OrmR<Role extends string = string> extends ApiR, Omit<OrmE<Role>, OrmTimeNames> {
  createdAt: Maybe<string>;
  label: Maybe<string>;
  status: AuthStatus;
  updatedAt: Maybe<string>;
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