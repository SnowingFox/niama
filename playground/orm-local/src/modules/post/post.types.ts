import { Maybe } from '@niama/core';
import { OrmE, OrmNames, OrmR, OrmTimeNames } from '@niama/orm';
import { OrmO } from '@niama/orm-client';
import { LocaleMessage } from 'vue-i18n';

import { Post } from './post.model';

// MAIN ====================================================================================================================================

export type PostO = OrmO<PostR, Post, PostF, PostW, PostOB>;

// FIELDS ==================================================================================================================================

export type PostF = PostNames[];

// PROPS ===================================================================================================================================

export type PostNames = OrmNames | 'category' | 'content' | 'image';

// OBJECTS =================================================================================================================================

export interface PostE extends OrmE {
  category: Maybe<PostCategory>;
  content: Maybe<string>;
  image: Maybe<string>;
}

export interface PostR extends Omit<PostE, OrmTimeNames>, OrmR {}

export type PostCategory = 'COMPUTER_SCIENCE' | 'LITERATURE' | 'POLITICS' | 'RELIGION';

// REQUESTS ================================================================================================================================

export type PostOB = any;
export type PostW = any;

// INPUT ================================================================================================================================

export interface PostCI {
  category: PostCategorySelectO;
  content: string;
  label: string;
}

// UI ================================================================================================================================

export interface PostCategorySelectO {
  label: LocaleMessage;
  value: PostCategory;
}