import { OrmActions } from '@niama/orm-client';
import Component, { mixins } from 'vue-class-component';

import { postApi } from './f.post.helper';
import { Post } from './post.model';
import { PostO } from './post.types';

@Component
export class PostActions extends mixins<OrmActions<PostO>>(OrmActions) {
  // VARIABLES =============================================================================================================================

  protected api = postApi;
  protected modelClass = Post;
}
