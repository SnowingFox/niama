import { init } from '@niama/auth-server';
import gql from 'graphql-tag';
import nodemailer from 'nodemailer';

import * as T from '@/hasura-accounts/types';
import { UserEmail as userEmailEntity } from './b.user.email.entity';
import { User as userEntity } from './b.user.entity';
import { UserProfile as userProfileEntity } from './b.user.profile.entity';
import { UserService as userServiceEntity } from './b.user.service.entity';
import { UserSession as userSessionEntity } from './b.user.session.entity';

const password: T.Auth.PasswordO = {
  sendVerificationEmailAfterSignup: true,
  validateNewUser: (user) => {
    if (user.profile.firstname.length < 2) throw new Error('First name too short');
    return user;
  },
};

const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'gregory.bouteiller@gmail.com', pass: 'o5m0s3_gmA' } });
const server: T.Auth.ServerO = { sendMail: (p) => transporter.sendMail(p) };

const graphql: T.Auth.GraphqlO = {
  typeDefs: gql`
    extend type User {
      profile: UserProfile!
      roles: [String!]!
    }

    type UserProfile {
      firstname: String!
      lastname: String!
    }

    extend input CreateUserInput {
      profile: CreateUserProfileInput!
      roles: [String!]!
    }

    input CreateUserProfileInput {
      firstname: String!
      lastname: String!
    }
  `,
};

const typeorm: T.Auth.TypeormO = {
  cache: 1000,
  entities: { userEntity, userEmailEntity, userProfileEntity, userServiceEntity, userSessionEntity },
};

init({ graphql, password, server, typeorm });
