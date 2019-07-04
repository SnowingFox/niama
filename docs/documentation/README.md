# General

## Component

Each component is developed in 2 to 4 files:

```ts
my_component.component.ts // script
my_component.component.pug // template
my_component.component.json // i18n (optional)
my_component.component.css // style (optional)
```

### I18n

As soon as your component needs some labels, you have to:

- create a `my_component.component.json` file that contains a dictionary of key/labels
- into the `script` file, import the `i18n` file as `i18n`
- into the `script` file, create a `i18n` variable inside your component initialized with `i18n`

```ts
import i18n from './my-component.component.json';

...

@Component({...})
export class MyComponentC {
  i18n: N.Dict = i18n;
}
```