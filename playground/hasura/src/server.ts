import { AccountsModule } from '@accounts/graphql-api';
import { AccountsPassword } from '@accounts/password';
import AccountsServer from '@accounts/server';
import { AccountsTypeorm, entities } from '@accounts/typeorm';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import express from 'express';
import nodemailer from 'nodemailer';
import { Connection, createConnection } from 'typeorm';

export const main = async () => {
  const { DB_HOST, DB_NAME, DB_PORT, DB_PWD, DB_USER, NIAMA_AUTH_PORT, NIAMA_AUTH_SECRET, QUASAR_HOST, QUASAR_PORT } = process.env;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gregory.bouteiller@gmail.com',
      pass: 'o5m0s3_gmA',
    },
  });

  let connection: Connection | null = null;
  try {
    connection = await createConnection({
      type: 'postgres',
      url: `postgres://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      entities,
      synchronize: true,
    });
  } catch (error) {
    console.error('Error establishing DB connection', error);
    return;
  }

  const serverO = {
    db: new AccountsTypeorm({ connection, cache: 1000 }),
    sendMail: async ({ from, subject, to, text, html }) => await transporter.sendMail({ from, to, subject, text, html }),
    siteUrl: `http://${QUASAR_HOST}:${QUASAR_PORT}`,
    tokenSecret: NIAMA_AUTH_SECRET!,
  };

  const password = new AccountsPassword({ sendVerificationEmailAfterSignup: true });
  const accountsServer = new AccountsServer(serverO, { password });
  const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

  const schema = makeExecutableSchema({
    typeDefs: accountsGraphQL.typeDefs,
    resolvers: accountsGraphQL.resolvers,
    // schemaDirectives: { ...accountsGraphQL.schemaDirectives },
  });

  const server = new ApolloServer({ schema, context: accountsGraphQL.context });
  const app = express();

  app.get('/webhook', (_req, res) => res.status(200).json({ 'X-Hasura-Role': 'anonymous' }));

  server.applyMiddleware({ app });

  app.listen({ port: NIAMA_AUTH_PORT }, () => console.log(`🚀 Server ready at http://localhost:${NIAMA_AUTH_PORT}${server.graphqlPath}`));
};

main();
