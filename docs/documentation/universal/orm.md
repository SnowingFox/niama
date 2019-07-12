# NIAMA ORM

## Backend Resource : CrudBR

A backend resource `BR` has the following fields :

```ts
interface CrudBR extends BR {
  // __typename: string;
  // id: string;
  canDelete: boolean;
  canRead: boolean;
  canStatus: boolean;
  canUpdate: boolean;
  createdAt: string;
  label: string;
  status: AuthStatus;
  updatedAt: string;
}
```

When you create a query, you can only request the fields that you need: 

```ts
Partial<BR>
```

The following fields are mandatory :

```ts
const $crudBrF = [
  'canDelete',
  'canRead',
  'canStatus',
  'canUpdate',
  'id',
  'label',
  'status',
}
```

> `__typename` is always returned automatically.

So, their default values are set to `undefined` to throw an error if they are missing from the query:

```ts
const $crudBRVD: Required<BR> = {
  __typename: undefined,
  canDelete: undefined,
  canRead: undefined,
  canStatus: undefined,
  canUpdate: undefined,
  createdAt: null,
  id: undefined,
  label: undefined,
  status: undefined,
  updatedAt: null
};
```

## Frontend Resource : CrudFR

## Services

### Constants

### Validators

### Transformers
