export const addIntF = (t: N.PrismaExtendTypeBlock<'Query'>, fields: string[]) =>
  fields.forEach((type) => t.field(type, { type: 'Int', resolve: () => 0 }));

export const addBooleanF = (t: N.PrismaExtendTypeBlock<'Query'>, fields: string[]) =>
  fields.forEach((type) => t.field(type, { type: 'Boolean', resolve: () => true }));
