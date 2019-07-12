import { ApiQR } from '@niama/api-client';
import { Maybe, pick, Type } from '@niama/core';
import { OrmReadManyArgs } from '@niama/orm';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { OrmConfig, OrmRPO } from './types';

@Component
export class OrmRP<RPO extends OrmRPO> extends Vue {
  // VARIABLES =============================================================================================================================

  @Prop({ type: Object }) args!: OrmReadManyArgs<RPO['Where'], RPO['OrderBy']>;
  @Prop({ type: Function, default: (model: RPO['Model']) => model }) modelToItem!: (model: RPO['Model']) => RPO['Item'];
  @Prop({ type: Boolean, default: false }) manual!: boolean;
  @Prop({ type: Boolean, default: false }) fetchAll!: boolean;

  allItems: Maybe<RPO['Item'][]> = null;
  currentItems: RPO['Item'][] = [];
  item: Maybe<RPO['Item']> = null;
  loading: boolean = false;
  total: Maybe<number> = null;

  get allFetched(): boolean {
    return !!this.allItems;
  }

  get items(): RPO['Item'][] {
    return this.allItems ? this.allItems : this.currentItems;
  }

  protected api!: OrmConfig<RPO['Fields']>;
  protected modelClass!: Type<RPO['Model']>;

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

  async count(): Promise<Maybe<number>> {
    this.loading = true;
    const { data }: ApiQR<number> = await this.$apollo.query({ query: this.api.requests.count });
    const result: Maybe<number> = data ? data[this.api.labels.COUNT] : null;
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
    const result: RPO['Item'][] = await this.readMany(args);
    if (!args) this.allItems = result;
    else this.currentItems = result;
    if (this.fetchAll && !this.allItems) this.allItems = await this.readMany();
  }

  async read(id: string): Promise<RPO['Item']> {
    this.loading = true;
    const { data }: ApiQR<RPO['Resource']> = await this.$apollo.query({
      query: this.api.requests.read(),
      variables: { where: { id } },
    });
    const result: RPO['Item'] = data ? this.modelToItem(new this.modelClass(data[this.api.labels.READ])) : null;
    this.loading = false;
    return result;
  }

  async readMany(args?: OrmReadManyArgs<RPO['Where'], RPO['OrderBy']>): Promise<RPO['Item'][]> {
    this.loading = true;
    const { data }: ApiQR<RPO['Resource'][]> = await this.$apollo.query({
      query: args ? this.api.requests.readMany(this.api.fields) : this.api.requests.readAll(this.api.fields),
      variables: args,
    });
    const result: RPO['Item'][] = data ? data[this.api.labels.READ_MANY].map((dto) => this.modelToItem(new this.modelClass(dto))) : [];
    this.loading = false;
    return result;
  }

  update(item) {
    console.log('update', item);
  }
}
