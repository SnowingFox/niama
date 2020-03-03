export * from './src/api';
export { poF as ormPoF, poMinF as ormPoMinF, getD as getOrmD, getPoD as getOrmPoD } from './src/api';

export * from './src/api.resolver';

export * from './src/service';
export { getOps as getOrmOps, getRp as getOrmRp } from './src/service';

export * from './src/use-create';
export { useCreate as ormUseCreate, useCreateL$ as ormUseCreateL$, useCreateS$ as ormUseCreateS$ } from './src/use-create';

export * from './src/use-count';

export * from './src/use-delete-one';
export {
  useDeleteOne as ormUseDeleteOne,
  useDeleteOneL$ as ormUseDeleteOneL$,
  useDeleteOneS$ as ormUseDeleteOneS$,
} from './src/use-delete-one';

export * from './src/use-read-one';
export { useReadOne as ormUseReadOne } from './src/use-read-one';

export * from './src/use-read-many';
export { useReadMany as ormUseReadMany } from './src/use-read-many';

export * from './src/utils';
