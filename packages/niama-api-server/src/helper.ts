import { PrismaExtendTypeBlock } from 'nexus-prisma/dist/blocks/extendType';

export const addIntF = (t: PrismaExtendTypeBlock<'Query'>, fields: string[]) =>
  fields.forEach((type) => t.field(type, { type: 'Int', resolve: () => 0 }));

export const addBooleanF = (t: PrismaExtendTypeBlock<'Query'>, fields: string[]) =>
  fields.forEach((type) => t.field(type, { type: 'Boolean', resolve: () => true }));
