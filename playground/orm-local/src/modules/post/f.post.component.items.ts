import { OrmItems } from '@niama/orm-client';
import Component, { mixins } from 'vue-class-component';

import { postApi } from './f.post.helper';
import { Post } from './post.model';
import { PostO } from './post.types';

@Component
export class PostItems extends mixins<OrmItems<PostO>>(OrmItems) {
  // VARIABLES =============================================================================================================================

  protected api = postApi;
  protected modelClass = Post;
}
