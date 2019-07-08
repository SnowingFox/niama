import { ApiF, mutation, query, resourceF as apiRF } from '@niama/api-client';
import { AuthGrantNames } from '@niama/auth';
import { OrmLabelNames, OrmLabels, OrmStatusNames, OrmTimeNames } from '@niama/orm';

import { OrmF } from './types';

// FIELDS ==================================================================================================================================

export const capsF: AuthGrantNames[] = ['canDelete', 'canRead', 'canUpdate', 'canUpdateStatus'];
export const labelF: OrmLabelNames[] = ['label'];
export const statusF: OrmStatusNames[] = ['status'];
export const timeF: OrmTimeNames[] = ['createdAt', 'updatedAt'];
export const resourceF: OrmF = [...capsF, ...labelF, ...statusF, ...timeF, ...apiRF];
export const resourceMinF: OrmF = [...capsF, ...labelF, ...statusF, ...apiRF ];

/*export const nOrmBcButBrF: any = { ...nOrmCapsF, _: [...nOrmTimeF, ...nApiBrF] };
  export const nOrmFrButBrF: OrmFrButBrF[] = [...nOrmTimeF, ...nApiTypeF];
  export const nOrmFcButBcF: OrmFcButBcF[] = [...nOrmStatusF];
  export const nOrmFcButFrF: any = {
    ...nOrmCapsF,
    _: [...nOrmTimeF, ...nApiIdF, ...nOrmStatusF],
  };*/

// REQUESTS ================================================================================================================================

export function getRequests<F extends ApiF>(fields: F, labels: OrmLabels, remote = true, extraRequests = {}) {
  const { CI, COUNT, CREATE, DELETE, DELETE_MANY, EXISTS, READ, READ_ALL, READ_MANY, UI, UPDATE, UPSERT, WI, WUI } = labels;

  return {
    count: query([{ remote, selector: COUNT }]),
    create: mutation([{ remote, fields, selector: CREATE, varTypes: { data: CI } }]),
    delete: mutation([{ remote, fields: ['id'], selector: DELETE, varTypes: { where: WUI } }]),
    deleteMany: mutation([{ remote, fields: ['count'], selector: DELETE_MANY, varTypes: { where: WI } }]),
    exists: query([{ remote, selector: EXISTS, varTypes: { where: WI } }]),
    read: (f?: F) => query([{ remote, fields: f || fields, selector: READ, varTypes: { where: WUI } }]),
    readAll: (f?: F) => query([{ remote, fields: f || fields, selector: READ_ALL }]),
    readMany: (f?: F, connection?: string) =>
      query([{ connection, remote, fields: f || fields, selector: READ_MANY, varTypes: { first: 'Int', skip: 'Int', where: WI } }]),
    update: mutation([{ remote, fields, selector: UPDATE, varTypes: { data: UI, where: WUI } }]),
    upsert: mutation([{ remote, fields, selector: UPSERT, varTypes: { create: CI, update: UI, where: WUI } }]),
    ...extraRequests,
  };
}
