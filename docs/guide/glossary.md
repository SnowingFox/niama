# Glossary

## Boot

::: tip
A **Boot** is specific to **Quasar**.
:::

- *In the application:*

  | Type | Suffix | Name | File
  | - | - | - | -
  | Front | none | default | `src/boot/[boot-name].ts`

- *In a module or a library:*

  | Type | Suffix | Name | File
  | - | - | - | -
  | Front | `B` | `[bootName]B` | `f.[module-name].service.boot.*.ts`

A **Boot** is an exported `default` function that [Quasar](https://quasar.dev/quasar-cli/cli-documentation/boot-files) calls when it boots
the application, passing an object with the following properties to it:

| Property | Description
| - | -
| **app** | Object with which the root component gets instantiated by **Vue**
| **router** | Instance of **Vue Router** from `src/router/index.ts`
| **store** | Instance of the app **Vuex Store** - *store only will be passed if your project uses Vuex (you have `src/store`)*
| **Vue** | Is same as if we do `import Vue from 'vue'` and it’s there for convenience
| **ssrContext** | Available only on server-side, if building for **SSR**

```ts
export default ({ app, router, store, Vue }) => {
  // something to do
}
```

::: tip
A **Boot** can be `async`.
:::

::: tip
A **Boot** is a kind of **Service**.
:::

## Component

| Type | Suffix | Name | File
| - | - | - | -
| Front | `C` | `ComponentNameC` | `f.[module-name].component.*.(ts|vue)` inside a module or `[component-name].*.(ts|vue)` inside `components`

## Controller

| Type | Suffix | Name | File
| - | - | - | -
| Back | `CT` | `ControllerNameCT` | `b.[module-name].controller.*.ts`

## Decorator

| Type | Suffix | Name | File
| - | - | - | -
| Back | `CT` | `DecoratorName` | `b.[module-name].service.controller.*.ts`

::: tip
A **Controller** is a kind of **Service**.
:::

## Entity

| Type | Suffix | Name | File
| - | - | - | -
| Universal | `E` or none  | `CrudE`, `User` | `u.[module-name].model.entity.ts`

::: tip
An **Entity** is a kind of **Model**.
:::

## Guard

| Type | Suffix | Name | File
| - | - | - | -
| Back | `G` | `GuardNameG` | `b.[module-name].service.guard.*.ts`

::: tip
A **Guard** is a kind of **Service**.
:::

## Helper

| Type | Suffix | Name | File
| - | - | - | -
| Back, Front, Universal | none  | multiple | `(b|f|u).[module-name].service.helper.*.ts`

A **Helper** consists in multiple exported constants or functions that can be used across the application.

::: warning
Each element is named `(a|n)ModuleNameExportedElementName` to avoid conflicts when imported.
:::

::: tip
A **Helper** is a kind of **Service**.
:::

## Layout

| Type | Suffix | Name | File
| - | - | - | -
| Front | `L` | `LayoutNameL` | `[layout-name].vue`

::: tip
A **Layout** is specific to **Quasar** and sits in the `layouts` folder.
:::

## Mixin

| Type | Suffix | Name | File
| - | - | - | -
| Front | `MD` | `MixinName` | `b.[module-name].module.*.ts`

## Module

| Type | Suffix | Name | File
| - | - | - | -
| Back | `MD` | `ModuleNameMD` | `b.[module-name].module.*.ts`

## Page

| Type | Suffix | Name | File
| - | - | - | -
| Front | `P` | `PageNameP` | `[page-fragment].vue`

::: tip
A **Page** is specific to **Quasar** and sits in the `pages` folder.
:::

## Repository

| Type | Suffix | Name | File
| - | - | - | -
| Front | `RP` | `RepositoryNameRP` | `f.[module-name].repository.ts`

::: tip
A **Repository** is a kind of **Component**.
:::

## Resolver

| Type | Suffix | Name | File
| - | - | - | -
| Back | `RS` | `ResolverNameRS` | `b.[module-name].service.resolver.ts`

::: tip
A **Resolver** is a kind of **Service**.
:::

## Resource

| Type | Suffix | Name | File
| - | - | - | -
| Universal | `R`  | `ResourceNameR` | `u.[module-name].model.resource.ts`

::: tip
A **Resource** is a kind of **Model**.
:::

## Service

| Type | Suffix | Name | File
| - | - | - | -
| Back, Front | `S`  | `ServiceNameS` | `(b|f).[module-name].service.*.ts`

## Strategy

| Type | Suffix | Name | File
| - | - | - | -
| Back | `STG` | `StrategyNameSTG` | `b.[module-name].service.strategy.*.ts`

::: tip
A **Strategy** is a kind of **Service**.
:::
