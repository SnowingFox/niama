# Svelte

## Quick Installation

```bash
npx degit sveltejs/template <project_name>
cd <project_name>
npm i
npm i -D prettier pug svelte-preprocess @fullhuman/postcss-purgecss autoprefixer postcss postcss-nested rollup-plugin-postcss tailwindcss
```

- create `.prettierrc`

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

- create `tailwind.config.js`

```js
module.exports = {
  theme: {},
  variants: {},
  plugins: [],
};
```

- Create `src/main.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Add `src/main.css` to `src/main.js`

```js
import './main.css';
```

- update `rollup.config.js`

```js
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;
const plugins = [require('postcss-nested')(), require('tailwindcss')(), require('autoprefixer')()];

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
  },
  plugins: [
    postcss({ extract: 'public/global.css', plugins }),
    svelte({
      dev: !production,
      preprocess: preprocess({ postcss: { plugins } }),
      css: (css) => css.write('public/bundle.css'),
    }),
    resolve({
      browser: true,
      dedupe: (importee) => importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),
    !production && livereload('public'),
    production && terser(),
  ],
  watch: { clearScreen: false },
};
```

## Detailed Installation

- In the appropriate folder, use **Degit** to initialize your project :

```bash
npx degit sveltejs/template <project_name>
```

- Go to your project folder and install packages :

```bash
cd <project_name>
npm i
```

### Prettier

- Install [prettier](https://prettier.io/) :

```bash
npm i -D prettier
```

- Add `.prettierrc` in your project to enable **Prettier** formatting :

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

### Pug

- Install :
  
  - [pug](https://pugjs.org/) : pug templating language
  - [svelte-preprocess](https://github.com/kaisermann/svelte-preprocess) : svelte plugin used to preprocess styles, templates, scripts

```bash
npm i -D pug svelte-preprocess
```

- In `rollup.config.js`, install the **Svelte Preprocess Plugin** to use **Pug**:

```js
import preprocess from 'svelte-preprocess';

export default {
  ...,
  plugins: [
    svelte({
      ...,
      preprocess: preprocess({ /* options */ }),
    })
  ]
}
```

### Tailwind CSS

- Install :
  
  - [@fullhuman/postcss-purgecss](https://www.purgecss.com/) : postss pugin used to purge unecessary css
  - [autoprefixer](https://github.com/postcss/autoprefixer) : postcss plugin used to autoprefix css when it is necessary
  - [postcss](https://postcss.org/) : postcss post processor for styling
  - [postcss-nested](https://github.com/postcss/postcss-nested) : postcss plugin used to allow nested syntax
  - [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss) :  rollup plugin used to process postcss
  - [tailwindcss](https://tailwindcss.com/) : css library

```bash
npm i -D @fullhuman/postcss-purgecss autoprefixer postcss postcss-nested rollup-plugin-postcss tailwindcss
```

- Create `tailwind.config.js` to make **Tailwind CSS** and its vs-code plugin happy :

```js
module.exports = {
  theme: {},
  variants: {},
  plugins: [],
};
```

- In `rollup.config.js`, create a variable for the **PostCSS Plugins** (it will be used later) :

```js
const plugins = [require('postcss-nested')(), require('tailwindcss')(), require('autoprefixer')()];
```

#### Tailwind CSS: global styling and inline styling inside templates

- Create `src/main.css` to have **Tailwind CSS** generate global styling via the **Rollup PostCSS Plugin** :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Add `src/main.css` to `src/main.js` to make **Rollup** process it with the **Rollup PostCSS Plugin** :

```js
import './main.css';
```

- In `rollup.config.js`, add the **Rollup PostCSS Plugin** and use it with the **PostCSS Plugins** to generate the `global.css` file:

```js
import postcss from 'rollup-plugin-postcss';

export default {
  ...
  plugins: [
    postcss({ extract: 'public/global.css', plugins }),
    svelte({
      ...
    }),
  ],
};
```

#### Tailwind CSS : styling inside \<style lang="postcss"\>

- In order to access **Tailwind CSS** inside `style` tags and use `@apply`, we need to add **PostCSS Plugins** to **Svelte Preprocess** in
`rollup.config.js` :

```js
export default {
  ...,
  plugins: [
    svelte({
      ...,
      preprocess: preprocess({ postcss: { plugins } }),
    })
  ]
}
```
