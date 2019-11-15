import { OrmMock } from '@niama/orm';

import { postCategories } from './post.helper';
import { PostCategory, PostR } from './post.types';

export class PostMock extends OrmMock implements PostR {
  // VARIABLES =============================================================================================================================

  __typename: string = 'Post';
  category: PostCategory = PostMock.chance.pickone(postCategories);
  content: string = PostMock.chance.paragraph({ sentences: 7 });
  image: string = PostMock.chance['image']();
}
