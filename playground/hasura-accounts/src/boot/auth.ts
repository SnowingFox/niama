import { boot } from '@niama/auth/accounts';
import gql from 'graphql-tag';

export default () =>
  boot({
    signinToDto: ({ email, password }) => ({ password, user: { email } }),
    signupToDto: ({ email, firstname, lastname, password, roles }) => ({ email, password, roles, profile: { firstname, lastname } }),
    userFieldsFragment: gql`
      fragment userFields on User {
        id
        emails {
          address
        }
        profile {
          firstname
          lastname
        }
        roles
      }
    `,
  });
