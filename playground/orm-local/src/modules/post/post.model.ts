import { fill, Map, maybe } from '@niama/core';
import { OrmModel } from '@niama/orm';
import { struct } from 'superstruct';

import { postCategories } from './post.helper';
import { PostCategory, PostE, PostR } from './post.types';

export class Post extends OrmModel<PostR> implements PostE {
  // STATIC ================================================================================================================================

  static schema: Map<PostR> = {
    ...OrmModel.schema,
    ...fill(maybe('string'), 'content', 'image'),
    category: maybe(struct.enum(postCategories)),
  };

  static defaults: Partial<PostR> = { ...OrmModel.defaults, ...fill(null, 'category', 'content', 'image') };

  // VARIABLES =============================================================================================================================

  category!: PostCategory;
  content!: string;
  image!: string;

  // LIFECYCLE =============================================================================================================================

  constructor(dto: Partial<PostR>, schema = Post.schema, defaults = Post.defaults) {
    super(dto, schema, defaults);
  }
}
