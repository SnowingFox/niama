import { DynamicModule, Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { makePrismaSchema } from 'nexus-prisma';

import { ApiS } from './b.api.service';

const gqlFactory = (
  client: N.PrismaClientInput,
  datamodelInfo: N.DatamodelInfo,
  types: any[],
  schema: string,
  typegen: string
) => async () => {
  makePrismaSchema({ types, outputs: { schema, typegen }, prisma: { client, datamodelInfo } });
  return {
    context: ({ req, res }) => ({ req, res }),
    cors: { credentials: true, origin: [`http://${process.env.QUASAR_HOST}:${process.env.QUASAR_PORT}`] },
    installSubscriptionHandlers: true,
    path: `/${process.env.NIAMA_API_PATH}`,
    subscriptions: { path: `/${process.env.NIAMA_API_PATH}` },
    typePaths: [schema],
  };
};

@Global()
@Module({})
export class ApiMD {
  static forRoot(prisma: N.PrismaClientInput, nexus: N.DatamodelInfo, types: any[], schema: string, typegen: string): DynamicModule {
    const apiS = { provide: 'ApiS', useFactory: () => new ApiS(prisma) };

    return {
      module: ApiMD,
      imports: [GraphQLModule.forRootAsync({ useFactory: gqlFactory(prisma, nexus, types, schema, typegen) })],
      providers: [apiS],
      exports: [apiS],
    };
  }
}
