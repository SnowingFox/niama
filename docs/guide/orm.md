# ORM

An ORM Module is a specific module. It can be described by a configuration interface containing :

```ts
interface OrmConfig {
  Model: M;
  Fields: F;
  Item: I;
  OrderBy: OB;
  Resource: R;
  Where: W;
}
```

## Models, Entities, Resources and Items

### Resources

Resources are pieces of data coming from external sources. So it essentially concerns Read operations. They are anonymous objects described
with an interface extending OrmR :

```ts
interface OrmR {
  __typename: string;
  canDelete!: Role[];
  canRead!: Role[];
  canUpdate!: Role[];
  canUpdateStatus!: Role[];
  createdAt: Maybe<string>;
  id: string;
  label: Maybe<string>;
  status: AuthStatus;
  updatedAt: Maybe<string>;
}
```

::: tip

#### About properties

- `__typename` is a mandatory Apollo property that represents the type of our data.
- `canDelete`, `canRead`, `canUpdate`, `canUpdateStatus` is a mandatory Apollo property that represents the type of our data.

:::

### Entities

### Models

An ORM Model has specific attributes :

```ts
class OrmModel {
  canDelete!: Role[];
  canRead!: Role[];
  canUpdate!: Role[];
  canUpdateStatus!: Role[];
  createdAt!: Maybe<Date>;
  id!: string;
  label!: Maybe<string>;
  status!: AuthStatus;
  updatedAt!: Maybe<Date>;
}
```

## Actions

## Orm Module Creation

When you create an ORM Module, you need the following files:

- `<my-concept>.mdl.ts`
- `<my-concept>.hlp.ts`
- `<my-concept>.types.ts`
