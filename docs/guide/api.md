# API

## Boot *(Client)*

`apiBootS`

### Local

### Rest

### Remote (Http & Socket)

## Requests *(Client)*

### Queries

### Mutations

### Subscriptions

## Labels *(Universal)*

## Objects *(Universal)*

### Resources

**Resources** are pieces of data coming from **external sources**. So it is essentially about **Read** operations. They are
**anonymous objects** described with an **interface extending [ApiR](/documentation/universal/api.html#apir).**

::: tip
About `ApiR` props:

- `__typename` represents the **type** of the resource (mandatory with **Apollo**).
- `id` is the **unique key** that represents the resource.
:::

### Entities

**Entities** are transitional representations from resources to models. They are **never used directly** and are just a mean to consolidate
our **models** with an **interface extending [ApiE](/documentation/universal/api.html#apie).**

::: tip
About `ApiE` props:

- `id` is **the unique key** that represents the entity.
:::

### Models

**Models** are the pieces of data used **inside our application**. They are defined with **classes** that **implement the corresponding
entity interfaces.**

### Mocks

**Mocks** are **fake resources** that can be injected directly in the **Local** store or accessed via a **Rest** service. They are defined
with **classes**.

## Fields *(Client)*

**Fields** represent the different properties of the resources that can be queried.
