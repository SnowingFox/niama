import { Maybe } from '@niama/core/types';
import * as Orm from '@niama/orm-client/types';
import { LocaleMessage } from 'vue-i18n';

import { Post } from '@/modules/post/post.mdl';

// MAIN ====================================================================================================================================

export type Config = Orm.Config<R, Post, F, W, OB>;

// FIELDS ==================================================================================================================================

export type F = Names[];

// PROPS ===================================================================================================================================

export type Names = Orm.Names | 'category' | 'content' | 'image';

// OBJECTS =================================================================================================================================

export interface E extends Orm.E {
  category: Maybe<Category>;
  content: Maybe<string>;
  image: Maybe<string>;
}

export interface R extends Omit<E, Orm.NamesTime>, Orm.R {}

export type Category = 'COMPUTER_SCIENCE' | 'LITERATURE' | 'POLITICS' | 'RELIGION';

// REQUESTS ================================================================================================================================

export type OB = any;
export type W = any;

// INPUT ================================================================================================================================

export interface CI {
  category: CategorySelectO;
  content: string;
  label: string;
}

// UI ================================================================================================================================

export interface CategorySelectO {
  label: LocaleMessage;
  value: Category;
}