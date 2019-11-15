# @niama/auth

## Helpers

### capFromGrant(item, grant)

- **Arguments:**
  - `item: R`
  - `grant: AuthGrant<R, Role>`

- **Return:**
`Role[]`

- **Usage:**
...

### capFromGrants(item, grants)

- **Arguments:**
  - `item: R`
  - `grants: AuthGrants<R, Role>`

- **Return:**
`AuthCaps<Role>`

- **Usage:**
...

### getCapsD()

- **Return:**
`AuthCaps<Role>`

- **Usage:**
...

### signinDI

### signupDI

### statuses

- **Type:**
`AuthStatus[]`
- **Value:**
`['__typename']`
- **Usage:**
...

### statusesI18n

- **Type:**
`I18n<AuthStatus>`
- **Value:**
`['__typename']`
- **Usage:**
...

## Types

### AuthCaps

Dictionary that relates each value of [AuthGrantNames](/documentation/universal/auth.html#authgrantnames) to an `Array` of **Roles**.

```ts
type AuthCaps<Role extends string = string> = Record<AuthGrantNames, Role[]>;
```

### AuthGrant

Either an `Array` of **Roles** or a `function` that returns an `Array` of **Roles** from a **Resource**.

```ts
type AuthGrant<Resource, Role extends string> = Role[] | ((item: Resource) => Role[]);
```

### AuthGrantNames

The different values of grants.

```ts
type AuthGrantNames = 'canDelete' | 'canRead' | 'canUpdate' | 'canUpdateStatus';
```

### AuthGrants

Dictionary that relates each value of [AuthGrantNames](/documentation/universal/auth.html#authgrantnames) to
[AuthGrant](/documentation/universal/auth.html#authgrant).

```ts
type AuthGrants<Resource, Role extends string> = Record<AuthGrantNames, AuthGrant<Resource, Role>>;
```

### AuthLabels

```ts
type AuthLabels = Record<AuthLabelsNames, string>;
```

### AuthLabelsNames

The different names of Auth API requests.

```ts
type AuthLabelsNames = 'AUTHORIZED_ROLES' | 'ME' | 'SELECTED_ROLE' | 'SET_AUTHORIZED_ROLES' | 'SET_SELECTED_ROLE' | 'TOKEN';
```

### AuthSigninI

Default representation of a Sign In process data.

```ts
interface AuthSigninI {
  password: string;
  username: string;
}
```

### AuthSignupI

Default representation of a Sign Up process data.

```ts
interface AuthSignupI {
  email: string;
  firstNames: string;
  lastName: string;
  phone: string;
}
```

### AuthStatus

The different statuses of a resource.

```ts
type AuthStatus = 'BLOCKED' | 'INCORRECT' | 'OK' | 'PENDING';
```

### AuthTokenE

```ts
interface AuthTokenE<Role extends string = string> extends ApiE {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  roles: Role[];
}
```

### AuthTokenNames

```ts
type AuthTokenNames = ApiRNames | 'aud' | 'exp' | 'iat' | 'iss' | 'roles';
```

### AuthTokenR

```ts
interface AuthTokenR<Role extends string = string> extends AuthTokenE<Role>, ApiR {}
```
