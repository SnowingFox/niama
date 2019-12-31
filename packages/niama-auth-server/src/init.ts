import { AccountsModule } from '@accounts/graphql-api';
import { AccountsPassword } from '@accounts/password';
import AccountsServer from '@accounts/server';
import { AccountsTypeorm } from '@accounts/typeorm';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import express from 'express';
import { Connection, createConnection } from 'typeorm';

import { patch } from './patch';
import * as T from './types';

export const initConnection = async (entities?: T.Entities): Promise<Connection> => {
  const { DB_HOST, DB_NAME, DB_PORT, DB_PWD, DB_USER } = process.env;
  const url = `postgres://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  return await createConnection({ url, entities: Object.values(entities || {}), type: 'postgres', synchronize: true });
};

export const init = async (opts: T.InitO) => {
  try {
    const { NIAMA_AUTH_PORT, NIAMA_AUTH_SECRET, QUASAR_HOST, QUASAR_PORT } = process.env;
    const siteUrl = `http://${QUASAR_HOST}:${QUASAR_PORT}`;

    const password = new AccountsPassword(opts.password);
    const connection = await initConnection(opts.typeorm?.entities);

    // sendMail: async ({ from, subject, to, text, html }) => await transporter.sendMail({ from, to, subject, text, html }),
    const db = new AccountsTypeorm({ ...opts.typeorm, connection });

    const accountsServer = new AccountsServer({ ...opts.server, db, siteUrl, tokenSecret: NIAMA_AUTH_SECRET! }, { password });
    patch(accountsServer);

    const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

    const typeDefs = opts.graphql?.typeDefs ? [accountsGraphQL.typeDefs, opts.graphql?.typeDefs] : [accountsGraphQL.typeDefs];
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers: [accountsGraphQL.resolvers, opts.graphql?.resolvers],
      // schemaDirectives: { ...accountsGraphQL.schemaDirectives },
    });

    const server = new ApolloServer({ schema, context: accountsGraphQL.context });
    const app = express();

    // app.get('/webhook', (_req, res) => res.status(200).json({ 'X-Hasura-Role': 'anonymous' }));

    server.applyMiddleware({ app });

    app.listen({ port: NIAMA_AUTH_PORT }, () => console.log(`🚀 Server ready at http://localhost:${NIAMA_AUTH_PORT}${server.graphqlPath}`));
  } catch (error) {
    console.error('Error establishing DB connection', error);
  }
};
