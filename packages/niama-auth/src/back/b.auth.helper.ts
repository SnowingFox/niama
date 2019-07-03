import { prismaExtendType } from 'nexus-prisma';
import { objectType } from 'nexus/dist';

// QUERY ===================================================================================================================================

export const QueryT = prismaExtendType({
  type: 'Query',
  definition: (t) => {
    t.field('me', { type: 'User', nullable: true, resolve: () => null });
  },
} as any);

// OBJECTS =================================================================================================================================

export const AuthCapsT = objectType({
  name: 'AuthCaps',
  definition: (t) => {
    t.boolean('deleteIt', { resolve: () => false });
    t.boolean('readIt', { resolve: () => false });
    t.boolean('updateIt', { resolve: () => false });
    t.boolean('updateItsStatus', { resolve: () => false });
  },
});

// API =====================================================================================================================================

export const api = [QueryT, AuthCapsT];

// HELPERS =================================================================================================================================

export function addCapsF<T extends string>(t: N.PrismaObjectDefinitionBlock<T>) {
  t.list.field('canDelete', { type: 'UserRole', resolve: () => [] } as any);
  t.list.field('canRead', { type: 'UserRole', resolve: () => [] } as any);
  t.list.field('canUpdate', { type: 'UserRole', resolve: () => [] } as any);
  t.list.field('canUpdateStatus', { type: 'UserRole', resolve: () => [] } as any);
}
