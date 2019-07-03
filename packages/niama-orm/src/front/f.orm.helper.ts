import { mutation, query, resourceF as apiRF } from '@niama/api/front';

// FIELDS ==================================================================================================================================

export const capsF: N.AuthGrantNames[] = ['canDelete', 'canRead', 'canUpdate', 'canUpdateStatus'];
export const labelF: N.OrmLabelFNames[] = ['label'];
export const statusF: N.OrmStatusFNames[] = ['status'];
export const timeF: N.OrmTimeFNames[] = ['createdAt', 'updatedAt'];
export const resourceF: N.OrmF = [...capsF, ...labelF, ...statusF, ...timeF, ...apiRF];
export const resourceMinF: N.OrmF = [...capsF, ...labelF, ...statusF, ...apiRF ];

/*export const nOrmBcButBrF: any = { ...nOrmCapsF, _: [...nOrmTimeF, ...nApiBrF] };
  export const nOrmFrButBrF: N.OrmFrButBrF[] = [...nOrmTimeF, ...nApiTypeF];
  export const nOrmFcButBcF: N.OrmFcButBcF[] = [...nOrmStatusF];
  export const nOrmFcButFrF: any = {
    ...nOrmCapsF,
    _: [...nOrmTimeF, ...nApiIdF, ...nOrmStatusF],
  };*/

// REQUESTS ================================================================================================================================

export function getRequests<F extends N.ApiF>(fields: F, labels: N.OrmLabels, remote = true, extraRequests = {}) {
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
