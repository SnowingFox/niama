# @niama/auth

## API

- auth
  - accessToken
  - id
  - idToken
  - refreshToken
  - role
  - roles
- user
  - 

## Methods

- changePassword
- confirmSignup
- getCurrent
- resetPassword
- sendResetPassword
- sendVerifyEmail
- sendConfirmSignup
- signin
- signout
- signup
- verifyEmail

## Amplify native methods

- currentAuthenticatedUser:
  - return: CognitoUser from federated or user pool, otherwise throws 'not authenticated'
  - request: as needed
  - dependency: currentUserPoolUser

- currentCredentials:
  - return: CognitoIdentityCredentials
  - request: always (buggy, should be as needed but checked is always false. So it always calls currentUserCredentials)

- currentSession:
  - return: Tokens with payloads from user pool
  - request: as needed
  - dependency: currentUserPoolUser

- currentUserCredentials:
  - return: CognitoIdentityCredentials from federated or user pool
  - request: always (because credentials.set is always called to overwrite credentials)
  - dependency: currentSession

- currentUserPoolUser:
  - return: CognitoUser from user pool
  - request: as needed

- currentUserInfo: 
  - return: { id, username, attributes } from federated or user pool
  - request: always (if user pool)
  - dependence: currentCredentials