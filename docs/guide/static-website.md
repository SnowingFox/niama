# Static Website

## Initialization

- In the appropriate folder, use **Gridsome CLI** to initialize your project :

```bash
gridsome create <folder_name>
```

- Go to the project directory :

```bash
cd <folder_name>
```

## Prettier

- Install **prettier** :

```bash
yarn add -D prettier
```

- Add `.prettierrc` :

```json
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "parser": "typescript",
  "printWidth": 140,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

## Typescript

- Install [Typescript](https://gridsome.org/plugins/gridsome-plugin-typescript) plugin :

```bash
yarn add -D typescript ts-loader tslint tslint-config-prettier gridsome-plugin-typescript vue-property-decorator
```

- Add `tsconfig.json` :

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "declaration": false,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "lib": ["esnext", "dom"],
    "module": "esnext",
    "moduleResolution": "node",
    "noImplicitAny": false,
    "resolveJsonModule": true,
    "sourceMap": true,
    "strict": true,
    "target": "esnext",
    "typeRoots": [
      "./node_modules/@types",
      "./types"
    ]
  }
}
```

- Add `tslint.json` :

```json
{
  "defaultSeverity": "warning",
  "extends": [
      "tslint:recommended",
      "tslint-config-prettier"
  ],
  "linterOptions": {
      "exclude": [
        "node_modules/**"
      ]
  },
  "rules": {
      /** enforces use of T[] for all types T. */
      "array-type": [true, "array"],
      /** allows banned types like String (for prisma generation for instance) */
      "ban-types": false,
      /** forbids any unnecessary curly braces. */
      "curly": [ true, "as-needed" ], 
      /** requires interface names to not have an “I” prefix. */
      "interface-name": [true, "never-prefix"],
      /** forbids public accessibility to be specified, because this is the default. */
      "member-access": [true, "no-public"],
      /** allows members unordered (for stylers property for instance). */
      "member-ordering": false,
      /** allows console. */
      "no-console": false,
      /** allows empty block. */
      "no-empty": false,
      /** allows empty interfaces. */
      "no-empty-interface": false,
      /** allows shadowed variables. */
      "no-shadowed-variable": false,
      /** allows string literals. */
      "no-string-literal": false,
      /** allow unordered keys. */
      "object-literal-sort-keys": false,
      /** allow non arrow functions */
      "only-arrow-functions": false,
      /** "check-format": allows only lowerCamelCased or UPPER_CASED variable names
          "allow-leading-underscore" allows underscores at the beginning.
          "allow-pascal-case" allows PascalCase in addition to lowerCamelCase.
          "ban-keywords": disallows the use of certain TypeScript keywords as variable or parameter names. */
      // "variable-name": [true, "ban-keywords", "check-format", "allow-leading-underscore", "allow-pascal-case"]
      "variable-name": false
  }
}
```

- Add plugin to `gridsome.config.js` :

```js
module.exports = {
  plugins: [
    {
      use: 'gridsome-plugin-typescript',
    }
  ]
}
```

## Pug

- Install [Pug](https://gridsome.org/plugins/gridsome-plugin-pug) plugin :

```bash
yarn add -D pug gridsome-plugin-pug
```

- Add plugin to `gridsome.config.js` :

```js
module.exports = {
  plugins: [
    {
      use: 'gridsome-plugin-pug',
    }
  ]
}
```

## Tailwind CSS

- Create `tailwind.config.js` :

```js
module.exports = {
  theme: {},
  variants: {},
  plugins: [],
};
```

- Create `purgecss.config.js` :

```js
class extractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\\/]+/g);
  }
}

module.exports = {
  content: ['./src/**/*.vue', './src/**/*.js', './src/**/*.jsx', './src/**/*.html', './src/**/*.pug', './src/**/*.md'],
  whitelist: ['body', 'html', 'img', 'a', 'g-image', 'g-image--lazy', 'g-image--loaded', 'svg-inline--fa'],
  whitelistPatterns: [/^fa-w-/],
  extractors: [{ extractor, extensions: ['vue', 'js', 'jsx', 'md', 'html', 'pug'] }],
};
```

- Add plugin to `gridsome.config.js` :

```js
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssPresetEnv = require('postcss-preset-env');
const postcssPurgecss = require('@fullhuman/postcss-purgecss');
const tailwind = require('tailwindcss');

const plugins = [postcssImport(), postcssPresetEnv({ stage: 0 }), postcssNested(), tailwind];
if (process.env.NODE_ENV === 'production') plugins.push(postcssPurgecss());

module.exports = {
  css: { loaderOptions: { postcss: { plugins } } },
};
```

- Create `style.css` :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Add `style.css` to `main.js` :

```js
import '~/style.css';
```

## Fontawesome

- Install **Fontawesome** packages :

```bash
yarn add @fortawesome/{vue-fontawesome,fontawesome-svg-core,free-solid-svg-icons}
```

- Add plugin to `gridsome.client.js` :

```js
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false;
library.add(faBars)

export default function (Vue) {
  Vue.component('fa-icon', FontAwesomeIcon)
}
```

- Add plugin to `style.css` :

```css
@import '@fortawesome/fontawesome-svg-core/styles.css';
```
