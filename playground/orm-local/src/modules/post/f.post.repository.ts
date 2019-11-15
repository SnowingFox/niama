import { OrmRP } from '@niama/orm-client';
import Component, { mixins } from 'vue-class-component';

import { postApi } from './f.post.helper';
import { Post } from './post.model';
import { PostO } from './post.types';

@Component
export class PostRP extends mixins<OrmRP<PostO>>(OrmRP) {
  // VARIABLES =============================================================================================================================

  protected api = postApi;
  protected modelClass = Post;
}
