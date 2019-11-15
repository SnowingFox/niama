import { Mock } from '@niama/orm';

import { categories } from './post.hlp';

export class PostMock extends Mock implements C.Post.R {
  // VARIABLES =============================================================================================================================

  __typename = 'Post';
  category: C.Post.Category = PostMock.chance.pickone(categories);
  content: string = PostMock.chance.paragraph({ sentences: 7 });
  image: string = PostMock.chance['image']();
}
