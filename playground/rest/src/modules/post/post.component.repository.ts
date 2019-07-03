import { pick } from '@niama/core';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { api } from './post.helper';
import { Post } from './post.model.entity';

@Component({
  apollo: {
    items: { query: api.requests.readMany(), update: ({ posts }) => posts, variables: { start: 0 } },
    total: { query: api.requests.count, update: ({ postsCount }) => postsCount },
  },
})
export class PostRP extends Vue {
  // VARIABLES =============================================================================================================================

  @Prop({ type: Object }) args!: N.OrmReadManyArgs<any, any>;

  items!: Post[];
  loading: boolean = false;
  total!: number;

  get canFetchMore(): boolean {
    return this.items !== undefined && this.total !== undefined && this.total > this.items.length;
  }

  // LIFECYCLE =============================================================================================================================

  render() {
    if (!this.$scopedSlots.default) return;
    return this.$scopedSlots.default({
      actions: pick(this, ['create']),
      ...pick(this, ['args', 'fetchMore', 'items', 'loading', 'total']),
    });
  }

  // METHODS ===============================================================================================================================

  async create() {
    this.loading = true;
    const result = await this.$apollo.mutate({ mutation: api.requests.create, variables: { data: {} } });
    console.log(result);
    this.loading = false;
  }

  async fetchMore(_index: number, done: Function) {
    if (this.canFetchMore)
      await this.$apollo.queries.items.fetchMore({
        variables: { start: this.items.length },
        updateQuery: ({ posts }, { fetchMoreResult }) => ({ posts: [...posts, ...fetchMoreResult.posts] }),
      });
    done();
  }
}
