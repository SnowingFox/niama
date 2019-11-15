import { fill, maybe } from '@niama/core';
import { Model } from '@niama/orm';
import { struct } from 'superstruct';

import { categories } from './post.hlp';

export class Post extends Model<C.Post.R> implements C.Post.E {
  // STATIC ================================================================================================================================

  static schema: C.Map<C.Post.R> = {
    ...Model.schema,
    ...fill(maybe('string'), 'content', 'image'),
    category: maybe(struct.enum(categories)),
  };

  static defaults: Partial<C.Post.R> = { ...Model.defaults, ...fill(null, 'category', 'content', 'image') };

  // VARIABLES =============================================================================================================================

  category!: C.Post.Category;
  content!: string;
  image!: string;

  // LIFECYCLE =============================================================================================================================

  constructor(dto: Partial<C.Post.R>, schema = Post.schema, defaults = Post.defaults) {
    super(dto, schema, defaults);
  }
}
