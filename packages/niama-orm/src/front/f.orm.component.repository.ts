
import { pick } from '@niama/core';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export class OrmRP<RP extends N.OrmRP> extends Vue {
  // VARIABLES =============================================================================================================================

  @Prop({ type: Object }) args!: N.OrmReadManyArgs<RP['Where'], RP['OrderBy']>;
  @Prop({ default: false, type: Boolean }) manual!: boolean;
  @Prop({ default: false, type: Boolean }) fetchAll!: boolean;

  allItems: N.Maybe<RP['Entity'][]> = null;
  currentItems: RP['Entity'][] = [];
  item: N.Maybe<RP['Entity']> = null;
  loading: boolean = false;
  total: N.Maybe<number> = null;

  get allFetched(): boolean {
    return !!this.allItems;
  }

  get items(): RP['Entity'][] {
    return this.allItems ? this.allItems : this.currentItems;
  }

  protected api!: N.OrmConfig<RP['Fields']>;
  protected entityClass!: N.Type<RP['Entity']>;

  // LIFECYCLE =============================================================================================================================

  async created() {
    if (!this.manual) await this.fetch();
  }

  render() {
    if (!this.$scopedSlots.default) return;
    return this.$scopedSlots.default({
      actions: pick(this, ['count', 'read', 'readMany']),
      ...pick(this, ['allFetched', 'args', 'fetch', 'items', 'loading']),
    });
  }

  // METHODS ===============================================================================================================================

  async count(): Promise<N.Maybe<number>> {
    this.loading = true;
    const { data }: N.ApiQR<number> = await this.$apollo.query({ query: this.api.requests.count });
    const result: N.Maybe<number> = data ? data[this.api.labels.COUNT] : null;
    this.loading = false;
    return result;
  }

  create(item) {
    console.log('create', item);
  }

  delete(id: string) {
    console.log('delete', id);
  }

  deleteMany(ids: string[]) {
    console.log('deleteAll', ids);
  }

  exists(id: string) {
    console.log('exists', id);
  }

  async fetch(args = this.args) {
    const result: RP['Entity'][] = await this.readMany(args);
    if (!args) this.allItems = result;
    else this.currentItems = result;
    if (this.fetchAll && !this.allItems) this.allItems = await this.readMany();
  }

  async read(id: string): Promise<RP['Entity']> {
    this.loading = true;
    const { data }: N.ApiQR<RP['Resource']> = await this.$apollo.query({
      query: this.api.requests.read(),
      variables: { where: { id } },
    });
    const result: RP['Entity'] = data ? new this.entityClass(data[this.api.labels.READ]) : null;
    this.loading = false;
    return result;
  }

  async readMany(args?: N.OrmReadManyArgs<RP['Where'], RP['OrderBy']>): Promise<RP['Entity'][]> {
    this.loading = true;
    const { data }: N.ApiQR<RP['Resource'][]> = await this.$apollo.query({
      query: args ? this.api.requests.readMany(this.api.fields) : this.api.requests.readAll(this.api.fields),
      variables: args,
    });
    const result: RP['Entity'][] = data ? data[this.api.labels.READ_MANY].map((dto) => new this.entityClass(dto)) : [];
    this.loading = false;
    return result;
  }

  update(item) {
    console.log('update', item);
  }
}
