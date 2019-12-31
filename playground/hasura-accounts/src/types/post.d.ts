import * as Orm from '@niama/orm/types';

export type Config = Orm.Config<Dto, F, W, OB>;
export type RP = Orm.RP<Config>;

export type Dto = any;

export type F = Names[];

export type Names = 'content' | 'id' | 'title';

export type OB = any;

export type W = any;
