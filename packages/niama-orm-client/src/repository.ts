
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
  @Prop({ default: false, type: Boolean }) manual!: boolean;
  @Prop({ default: false, type: Boolean }) fetchAll!: boolean;

  allItems: Maybe<RPO['Entity'][]> = null;
  currentItems: RPO['Entity'][] = [];
  item: Maybe<RPO['Entity']> = null;
  loading: boolean = false;
  total: Maybe<number> = null;

  get allFetched(): boolean {
    return !!this.allItems;
  }

  get items(): RPO['Entity'][] {
    return this.allItems ? this.allItems : this.currentItems;
  }

  protected api!: OrmConfig<RPO['Fields']>;
  protected entityClass!: Type<RPO['Entity']>;

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
    const result: RPO['Entity'][] = await this.readMany(args);
    if (!args) this.allItems = result;
    else this.currentItems = result;
    if (this.fetchAll && !this.allItems) this.allItems = await this.readMany();
  }

  async read(id: string): Promise<RPO['Entity']> {
    this.loading = true;
    const { data }: ApiQR<RPO['Resource']> = await this.$apollo.query({
      query: this.api.requests.read(),
      variables: { where: { id } },
    });
    const result: RPO['Entity'] = data ? new this.entityClass(data[this.api.labels.READ]) : null;
    this.loading = false;
    return result;
  }

  async readMany(args?: OrmReadManyArgs<RPO['Where'], RPO['OrderBy']>): Promise<RPO['Entity'][]> {
    this.loading = true;
    const { data }: ApiQR<RPO['Resource'][]> = await this.$apollo.query({
      query: args ? this.api.requests.readMany(this.api.fields) : this.api.requests.readAll(this.api.fields),
      variables: args,
    });
    const result: RPO['Entity'][] = data ? data[this.api.labels.READ_MANY].map((dto) => new this.entityClass(dto)) : [];
    this.loading = false;
    return result;
  }

  update(item) {
    console.log('update', item);
  }
}
