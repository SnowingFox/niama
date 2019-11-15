# @niama/api-client

## Helpers

### addDefaultFields(fields, defaultFields) [*(F extends ApiF)*](/documentation/client/api.html#apif)

- **Arguments:**
  - `fields: F`
  - `defaultFields: F`

- **Return:**
`F`

- **Usage:**
...

### getError(error)

- **Arguments:**
  - `error: any`

- **Return:**
`string`

- **Usage:**
...

### idF

- **Type:**
`ApiNamingId[]`
- **Value:**
`['id']`
- **Usage:**
...

### mutation(options, [name]) [*(F extends ApiF)*](/documentation/client/api.html#apif)

- **Arguments:**
  - `options: ApiRequestO<F>[]`
  - `name?: string`

- **Return:**
`DocumentNode`

- **Usage:**
...

### query(options, [name]) [*(F extends ApiF)*](/documentation/client/api.html#apif)

- **Arguments:**
  - `options: ApiRequestO<F>[]`
  - `name?: string`

- **Return:**
`DocumentNode`

- **Usage:**
...

### resourceF

- **Type:**
`ApiNamingR[]`
- **Value:**
`['__typename', 'id']`
- **Usage:**
...

### subscription(options, [name]) [*(F extends ApiF)*](/documentation/client/api.html#apif)

- **Arguments:**
  - `options: ApiRequestO<F>[]`
  - `name?: string`

- **Return:**
`DocumentNode`

- **Usage:**
...

### typeF

- **Type:**
`ApiNamingType[]`
- **Value:**
`['__typename']`
- **Usage:**
...

## Types

### ApiBootO

```ts
interface ApiBootO<D = any> {
  http?: boolean;
  initial?: () => D;
  resolvers?: Resolvers | Resolvers[];
  rest?: boolean;
  secured?: boolean;
  ws?: boolean;
}
```

### ApiConfig

```ts
interface ApiConfig<F extends ApiF, L, R> {
  fields: F;
  labels: L;
  requests: R;
}
```

### ApiF

```ts
type ApiF = string[] | { _: string[]; [id: string]: ApiF };
```

### ApiQData

```ts
type ApiQData<T> = Maybe<Record<string, T>>;
```

### ApiQR

```ts
type ApiQR<T> = ApolloQueryResult<ApiQData<T>>;
```

### ApiRequestConnection

```ts
interface ApiRequestConnection {
  key: string;
  filter?: string[];
}
```

### ApiRequestO

```ts
interface ApiRequestO<F extends ApiF> {
  connection?: ApiRequestConnection;
  fields?: F;
  remote?: boolean;
  rest?: ApiRequestRest;
  selector: string;
  varTypes?: Dict;
}
```

### ApiRequestRest

```ts
interface ApiRequestRest {
  method?: 'DELETE' | 'GET' | 'POST' | 'PUT';
  path: string;
  type: string;
}
```

### ApiRequestType

```ts
type ApiRequestType = 'mutation' | 'query' | 'subscription';
```
