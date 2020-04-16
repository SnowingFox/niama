import * as Orm from '@niama/orm/types';

export * from './src/types';

declare module '@niama/user/types' {
  interface Po extends Orm.Po {
    email: string;
    username: string;
  }
  /*interface Po extends Orm.Po, Omit<Vo, Orm.TimeK> {}

  interface Vo extends Orm.Vo {
    email: string;
    username: string;
  }*/
}
