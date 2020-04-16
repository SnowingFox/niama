import { apiPoF } from '@niama/api';
import { getCapsD } from '@niama/auth';
import { fill } from '@niama/core';

import * as T from './typings';

// FIELDS ==================================================================================================================================

export const capsF: T.Auth.GrantK[] = ['canDelete', 'canRead', 'canUpdate', 'canUpdateStatus'];
export const statusF: T.StatusK[] = ['status'];
export const timeF: T.TimeK[] = ['createdAt', 'updatedAt'];
export const poF: T.F = [...capsF, ...statusF, ...timeF, ...apiPoF];
export const poMinF: T.F = [...capsF, ...statusF, ...apiPoF];

// DEFAULTS ================================================================================================================================

export const getD = (): Pick<T.Vo, T.DefaultK> => ({ ...getCapsD(), ...fill(null, 'createdAt', 'updatedAt'), status: 'OK' });
export const getPoD = (): Pick<T.Po, T.DefaultK> => ({ ...getCapsD(), ...fill(null, 'createdAt', 'updatedAt'), status: 'OK' });

/*return {
    count: getQuery({ selector: L.count, varTypes: { where: L.whereI }, local, rest: restO.count }),
    create: (p) => {
      const { fields } = isGetDocumentNodeP(p) ? p : { fields: p };
      return getMutation({ selector: L.create, varTypes: { data: L.createI }, fields, local, rest: restO.create });
    },
    deleteMany: getMutation({ selector: L.deleteMany, varTypes: { where: L.whereI }, fields: ['count'], local, rest: restO.deleteMany }),
    deleteOne: getMutation({ selector: L.deleteOne, varTypes: { where: L.whereUI }, fields: ['id'], local, rest: restO.deleteOne }),
    exists: getQuery({ selector: L.exists, varTypes: { where: L.whereI }, local, rest: restO.exists }),
    readAll: (p) => {
      const { fields } = isGetDocumentNodeP(p) ? p : { fields: p };
      return getQuery({ selector: L.readMany, fields, local, rest: restO.readAll });
    },
    readMany: (p) => {
      const { alias, fields } = isGetDocumentNodeP(p) ? p : { fields: p, alias: undefined };
      return getQuery({
        selector: L.readMany,
        varTypes: { first: 'Int', orderBy: L.orderBy, skip: 'Int', where: L.whereUI },
        fields,
        alias,
        local,
        rest: restO.readMany,
      });
    },
    readOne: (p) => {
      const { fields } = isGetDocumentNodeP(p) ? p : { fields: p };
      return getQuery({ selector: L.readOne, varTypes: { where: L.whereUI }, fields, local, rest: restO.readOne });
    },
    update: (p) => {
      const { fields } = isGetDocumentNodeP(p) ? p : { fields: p };
      return getMutation({ selector: L.update, varTypes: { data: L.updateI, where: L.whereUI }, fields, local, rest: restO.update });
    },
    upsert: (p) => {
      const { fields } = isGetDocumentNodeP(p) ? p : { fields: p };
      return getMutation({
        selector: L.upsert,
        varTypes: { create: L.createI, update: L.updateI, where: L.whereUI },
        fields,
        local,
        rest: restO.upsert,
      });
    },
    ...extra,
    ...extraFactories,
  } as T.Ops<F, C, S>;*/

/*export const getRp = <C extends T.Cfg, L extends string, O extends string>({ F, L, ...rest }: T.GetRpP<C['Fields'], L, O>): T.Rp<C> => {
  return { F, L, O: getOps({ L, ...rest }) };
};*/
