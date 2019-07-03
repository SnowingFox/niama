import { OrmRP } from '@niama/orm/front';
import Component, { mixins } from 'vue-class-component';

import { api } from './post.helper';
import { Post } from './post.model.entity';

@Component
export class PostRP extends mixins(OrmRP) {
  // VARIABLES =============================================================================================================================

  protected api: N.OrmConfig<any> = api;
  protected entityClass = Post;
}
