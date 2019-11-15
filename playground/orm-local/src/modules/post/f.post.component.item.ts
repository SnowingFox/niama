import { OrmItem } from '@niama/orm-client';
import Component, { mixins } from 'vue-class-component';

import { postApi } from './f.post.helper';
import { Post } from './post.model';
import { PostO } from './post.types';

@Component
export class PostItem extends mixins<OrmItem<PostO>>(OrmItem) {
  // VARIABLES =============================================================================================================================

  protected api = postApi;
  protected modelClass = Post;
}
