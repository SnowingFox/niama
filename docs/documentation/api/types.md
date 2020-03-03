# Types

## BootO

```ts
export interface BootO {
  debug: boolean;
  http: boolean | HttpLinkO;
  prelink?: ApolloLink;
  resolvers: Resolvers | Resolvers[];
  rest: boolean | RestLinkO;
  secured: boolean;
  seeds: Actioner[];
  ws: boolean;
}
```
