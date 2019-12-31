import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import gql from 'graphql-tag';
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as LocalStrategy } from 'passport-local';

const main = async () => {
  passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, (username, password, done) => {
      /*User.query()
      .where('username', username)
      .first()
      .then((user) => {
        if (!user) return done('Unknown user');
        user.verifyPassword(password, (err, passwordCorrect) => {
          if (err) return done(err);
          if (!passwordCorrect) return done('Invalid password');
          return done(null, user);
        });
      })
      .catch((err) => done(err));*/
    })
  );

  passport.use(
    new BearerStrategy((token, done) => {
      /*User.query()
      .where('token', token)
      .first()
      .then((user) => {
        if (!user) return done('Invalid Token');
        return done(null, user);
      })
      .catch((err) => done(err));*/
    })
  );

  const typeDefs = gql`
    type Mutation {
      signin(username: String!, password: String!): String
      signup(username: String!, password: String!): String
    }
  `;

  const resolvers = {
    Mutation: {
      signin: async (_, { password, username }) => 
        passport.authenticate('local', (err, user) => {})(),
      signup: async (_, { password, username }) => username,
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();

  app.get('/webhook', (_req, res) => res.status(200).json({ 'X-Hasura-Role': 'anonymous' }));

  server.applyMiddleware({ app });

  app.listen({ port: 9001 }, () => console.log(`🚀 Server ready at http://localhost:9001${server.graphqlPath}`));
};

main();
