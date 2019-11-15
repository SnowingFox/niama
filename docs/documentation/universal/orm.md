# @niama/orm

## Helpers

### getLabels(singular, [other])

- **Arguments:**
  - `singular: string`
  - `other?: Record<T, string>`

- **Return:**
[OrmLabels\<T>](./orm.html#ormlabels-t)

- **Usage:**

Generate **ORM Labels** and optional ones as `other` from `singular` name of a concept.

```js
// register an extended constructor
Vue.component('my-component', Vue.extend({ /* ... */ }))

// register an options object (automatically call Vue.extend)
Vue.component('my-component', { /* ... */ })

// retrieve a registered component (always return constructor)
var MyComponent = Vue.component('my-component')
```

## Mock

### OrmMock

- **Arguments:**
  - `singular: string`
  - `other?: Record<T, string>`

- **Return:**
[OrmLabels\<T>](./orm#ormlabels-t)

- **Usage:**

Generate **ORM Labels** and optional ones as `other` from `singular` name of a concept.

```js
// register an extended constructor
Vue.component('my-component', Vue.extend({ /* ... */ }))

// register an options object (automatically call Vue.extend)
Vue.component('my-component', { /* ... */ })

// retrieve a registered component (always return constructor)
var MyComponent = Vue.component('my-component')
```

## Model

### OrmModel

- **Arguments:**
  - `singular: string`
  - `other?: Record<T, string>`

- **Return:**
[OrmLabels\<T>](./orm.md#ormlabels-t)

- **Usage:**

Generate **ORM Labels** and optional ones as `other` from `singular` name of a concept.

```js
// register an extended constructor
Vue.component('my-component', Vue.extend({ /* ... */ }))

// register an options object (automatically call Vue.extend)
Vue.component('my-component', { /* ... */ })

// retrieve a registered component (always return constructor)
var MyComponent = Vue.component('my-component')
```

## Types

### OrmActions

### OrmE

### OrmLabelNames

### OrmLabels\<T>

### OrmLabelsStrict

### OrmInputLabelNames

### OrmMainLabelNames

### OrmNames

### OrmR

### OrmRequestLabelNames

### OrmReadManyArgs<Where, OrderBy>

### OrmStatusNames

### OrmTimeNames

### OrmUpsertArgs<Create, Update, WhereUnique>
