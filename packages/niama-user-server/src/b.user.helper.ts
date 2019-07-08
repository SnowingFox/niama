import { addIntF } from '@niama/api/back';
import { addCapsF } from '@niama/auth/back';
import { arg, enumType, subscriptionField } from 'nexus';
import { prismaExtendType, prismaObjectType } from 'nexus-prisma';

import { labels } from '../universal/u.user.helper';

// QUERY ===================================================================================================================================

export const QueryT = prismaExtendType({
  type: 'Query',
  definition: (t) => {
    addIntF(t, [labels.COUNT]);

    t.field('users', {
      ...t.prismaType.users,
      args: { ...t.prismaType.users.args, orderBy: arg({ type: 'UserOB' as any }) },
      resolve: () => [],
    });
  },
} as any);

// MUTATION ================================================================================================================================

export const MutationT = prismaExtendType({
  type: 'Mutation',
  definition: (t) => {
    t.prismaFields(['createUser']);
  },
} as any);

// SUBSCRIPTIONS ===========================================================================================================================

export const UserSubscriptionPayloadT = subscriptionField('user', {
  type: 'UserSubscriptionPayload' as any,
  subscribe: () => true as any,
  resolve: (payload) => payload,
});

// OBJECTS =================================================================================================================================

export const UserT = prismaObjectType({
  name: 'User',
  definition: (t) => {
    t.prismaFields({ filter: ['password'] });
    addCapsF(t);
    t.string('label', { resolve: () => '' });
  },
} as any);

// ENUMS ===================================================================================================================================

export const UserOBT = enumType({
  name: 'UserOB',
  members: ['label_ASC', 'label_DESC'],
});

// API =====================================================================================================================================

export const api = [QueryT, MutationT, UserSubscriptionPayloadT, UserT, UserOBT];
