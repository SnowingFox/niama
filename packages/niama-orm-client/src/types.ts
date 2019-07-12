import { ApiConfig, ApiF } from '@niama/api-client';
import { OrmE, OrmLabels, OrmNames } from '@niama/orm';
import { DocumentNode } from 'graphql';

// MAIN ====================================================================================================================================

export interface OrmRPO<R = any, M extends OrmE = any, F extends ApiF = any, W = any, OB = any, I = M> {
  Model: M;
  Fields: F;
  Item: I;
  OrderBy: OB;
  Resource: R;
  Where: W;
};

export type OrmConfig<F extends ApiF> = ApiConfig<F, OrmLabels, OrmRequests<F>>;

// FIELDS ==================================================================================================================================

export type OrmF = OrmNames[];

// export type OrmEButR = OrmTimeFNames | AP.ApiTypeFNames;
// export type OrmFcButBcF = OrmStatusFNames;
// export type OrmButBcF = casp | AP.ApiIdFNames;
// export type OrmButBuF = OrmCapsFNames;

// REQUESTS ================================================================================================================================

export type OrmRequestSimpleNames = 'count' | 'create' | 'delete' | 'deleteMany' | 'exists' | 'update' | 'upsert';
export type OrmRequestComplexNames = 'read' | 'readAll' | 'readMany';
export type OrmRequestNames = OrmRequestSimpleNames | OrmRequestComplexNames;
export interface OrmRequests<F extends ApiF> extends Record<OrmRequestSimpleNames, DocumentNode> {
  read: (fields?: F) => DocumentNode;
  readAll: (fields?: F) => DocumentNode;
  readMany: (fields?: F, connection?: string) => DocumentNode;
}


