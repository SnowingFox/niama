# NIAMA API

## Backend Resource : BR

### Fields

A backend resource has the following fields:

```ts
interface BR {
  __typename: string;
  id: string;
}
```

### Constants

The following constants are available:

```ts
const $idF = ["id"]; // champ identifiant
const $typeF = ["__typename"]; // champ type
const $brF = ["id", "__typename"]; //champs identifiant et type
```

### Types

The following types are available:

```ts
type IdF = "id";
type TypeF = "__typename";
type BRF = "id" | "__typename";
```
