import { AccountsPasswordOptions } from '@accounts/password/lib/accounts-password';
import { AccountsServerOptions } from '@accounts/server';
import { AccountsTypeormOptions } from '@accounts/typeorm/lib/types';
import * as Api from '@niama/api/types';

export interface InitO {
  graphql?: GraphqlO;
  password?: PasswordO;
  server?: ServerO;
  typeorm?: TypeormO;
}

export type PasswordO = AccountsPasswordOptions;
export type ServerO = Omit<AccountsServerOptions, ServerNamesAlready>;
export type ServerNamesAlready = 'db' | 'siteUrl' | 'tokenSecret';

export type TypeormONamesAlready = 'connection' | 'connectionName' | TypeormONamesEntity;
export type TypeormONamesEntity = 'userEntity' | 'userEmailEntity' | 'userServiceEntity' | 'userSessionEntity';

export interface TypeormO extends Omit<AccountsTypeormOptions, TypeormONamesAlready> {
  entities?: Entities;
}

export interface Entities extends Pick<AccountsTypeormOptions, TypeormONamesEntity> {
  [id: string]: any;
}

export interface GraphqlO {
  resolvers?: any;
  typeDefs?: Api.DocumentNode;
}
