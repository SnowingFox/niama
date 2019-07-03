import { ApiS } from '@niama/api/back';
import { getAuthCapsD } from '@niama/auth';
import { User as UserB } from '@niama/user';

// import { OrmBR as OrmBaseBR } from './b.orm.model.read';

export abstract class OrmS<
  // OrmBR extends OrmBaseBR,
  User extends UserB<Role>,
  Role extends string,
  Prisma extends N.ApiPrisma,
  C extends N.Orm
> {
  // LIFECYCLE =============================================================================================================================

  constructor(protected apiS: ApiS<Prisma>, protected labels: N.OrmLabels) {} //, protected OrmBR: N.RType<OrmBR>) {}

  // METHODS ===============================================================================================================================

  /*async count(): Promise<number> {
    return await this.dbCount();
  }

  async create(data): Promise<OrmBR> {
    const dto: C['Prisma']['Read'] = await this.dbCreate(data);
    return await this.OrmBR.fromDto(dto);
  }

  async delete(where: C['Prisma']['WhereUnique']): Promise<OrmBR> {
    const dto: C['Prisma']['Read'] = await this.delete(where);
    return await this.OrmBR.fromDto(dto);
  }

  async deleted(where: C['Prisma']['SubscriptionWhere']): Promise<C['Prisma']['Subscription']> {
    return await this.dbDeleted(where);
  }

  async deleteMany(where: C['Prisma']['Where']): Promise<{ count: string }> {
    return await this.deleteMany(where);
  }

  async exists(where: C['Prisma']['Where']): Promise<boolean> {
    return await this.dbExists(where);
  }*/

  async grants(me: N.Maybe<User>): Promise<N.AuthGrants<C['Nexus']['Read'], Role>> {
    return getAuthCapsD();
  }

  /*async read(where: C['Prisma']['WhereUnique']): Promise<N.Maybe<OrmBR>> {
    const dto: C['Prisma']['Read'] = await this.read(where);
    return dto ? await this.OrmBR.fromDto(dto) : null;
  }

  async readMany(args: N.OrmReadManyArgs<C['Prisma']['Where'], C['Prisma']['OrderBy']>): Promise<OrmBR[]> {
    const dtos: C['Prisma']['Read'][] = await this.readMany(args);
    return await Promise.all(dtos.map((dto) => this.OrmBR.fromDto(dto)));
  }*/

  // PRISMA ================================================================================================================================

  async count(): Promise<number> {
    return this.apiS.prisma[`${this.labels.PLURAL}Connection`]()
      .aggregate()
      .count();
  }

  async create(data: C['Prisma']['Create']): Promise<C['Prisma']['Read']> {
    return this.apiS.prisma[this.labels.CREATE](data);
  }

  async created(where: C['Prisma']['SubscriptionWhere']): Promise<C['Prisma']['Subscription']> {
    return this.apiS.prisma.$subscribe[this.labels.READ]({ ...where, mutation_in: ['CREATED'] });
  }

  async delete(where: C['Prisma']['WhereUnique']): Promise<C['Prisma']['Read']> {
    return this.apiS.prisma[this.labels.DELETE](where);
  }

  async deleteMany(where: C['Prisma']['Where']): Promise<{ count: string }> {
    return this.apiS.prisma[this.labels.DELETE_MANY](where);
  }

  async deleted(where: C['Prisma']['SubscriptionWhere']): Promise<C['Prisma']['Subscription']> {
    return this.apiS.prisma.$subscribe[this.labels.READ]({ ...where, mutation_in: ['DELETED'] });
  }

  async exists(where: C['Prisma']['Where']): Promise<boolean> {
    return this.apiS.prisma.$exists[this.labels.SINGULAR](where);
  }

  async read(where: C['Prisma']['WhereUnique']): Promise<C['Prisma']['Read']> {
    return this.apiS.prisma[this.labels.READ](where);
  }

  async readMany(args: N.OrmReadManyArgs<C['Prisma']['Where'], C['Prisma']['OrderBy']>): Promise<C['Prisma']['Read'][]> {
    return this.apiS.prisma[this.labels.READ_MANY](args);
  }

  async update(data: C['Prisma']['Update'], where: C['Prisma']['WhereUnique']): Promise<C['Prisma']['Read']> {
    return this.apiS.prisma[this.labels.UPDATE]({ data, where });
  }

  async upsert(
    args: N.OrmUpsertArgs<C['Prisma']['Create'], C['Prisma']['Update'], C['Prisma']['WhereUnique']>
  ): Promise<C['Prisma']['Read']> {
    return this.apiS.prisma[this.labels.UPSERT](args);
  }
}
