# Modules

A module consists in a set of files all related to a specific concept in your application. For instance, if you are building a blog, you can
create a `post` module to manage everything concerning the posts of your blog.

## Creation

### Structure

In the `src/modules` directory, create a `module-name` directory :

```bash
src
└─ modules
   └─ module-name
      ├─ b.module-name.*.ts
      ├─ f.module-name.*.ts
      └─ module-name.*.ts
```

:::tip

- All files are prefixed with `module-name.`
- Backend-only files are prefixed with `b.module-name.`
- Frontend-only files are prefixed with `f.module-name.`
:::

### Types and interfaces

The file `module-name.types.ts` contains all the types and interfaces specific to your module.

:::tip
All types and interfaces are prefixed with `ModuleName`
:::

#### Entity

#### Fields

#### Resource

### Model

### Mock (optional)

The file `module-name.mock.ts` contains a class `ModuleNameMock` that implements the module resource `ModuleNameR`. Each property should be
instantiated with specific values or random ones generated with the [Chance library](https://chancejs.com/).

```ts

```
