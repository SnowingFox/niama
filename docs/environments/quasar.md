# Quasar

## Main

- In the appropriate folder, use Quasar CLI to initialize your project:

```bash
quasar create <folder_name> -b dev
```

- Create two folders: `config` and `src/modules`.
- Create `.env.dev`:

```env
AUTH_ACCESS_COOKIE=authAccessCookie
AUTH_AUDIENCE=authAudience
AUTH_ID_COOKIE=authIdCookie
AUTH_ISSUER=authIssuer
AUTH_SECRET=authSecret

MYSQL_PASSWORD=prisma
MYSQL_PORT=3306

NEST_PORT=nestPort

NODE_ENV=development

PRISMA_HOST=prismaHost
PRISMA_MANAGEMENT_API_SECRET=prismaManagementApiSecret
PRISMA_PORT=prismaPort
PRISMA_SECRET=prismaSecret

```

- Add `scripts` to `package.json`:

```json
{
  ...
  "scripts": {
    ...
    "dev:quasar": "quasar dev",
    ...
  }
  ...
}
```

## Prettier

Install prettier package:

```bash
npm i -D prettier
```

Add `.prettierrc` to your project folder:

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

## Aliases

Add aliases to `quasar.conf.js`:

```js
...
const path = require('path');

const alias = (cfg) => {
  cfg.resolve.alias = {
    ...cfg.resolve.alias,
    '~': __dirname,
    '@': path.resolve(__dirname, 'src'),
  };
}
...
module.exports = function (ctx) {
...
  build: {
    ...
    extendWebpack (cfg) {
      ...
      alias(cfg);
      ...
    }
    ...
  },
...
}
```

## Pug

Install pug and its loader as dev dependencies:

```bash
npm i -D pug pug-plain-loader
```

Add pug to `quasar.conf.js`:

```js
...
const pug = (cfg) => {
  cfg.module.rules.push({
    test: /\.pug$/,
    loader: 'pug-plain-loader'
  });
}
...
module.exports = function (ctx) {
...
  build: {
    ...
    extendWebpack (cfg) {
      ...
      pug(cfg);
      ...
    }
    ...
  },
...
}
```

## Typescript

- Install Quasar Extension for Typescript:

```bash
quasar ext add @quasar/typescript
```

- Install other required dev dependencies:

```bash
npm i -D tslint-config-prettier vue-class-component vue-property-decorator
```

- Replace the content of `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "lib": ["es2017", "dom"],
    "module": "esnext",
    "moduleResolution": "node",
    "noImplicitAny": false,
    "paths": {
      "~/*": ["./*"],
      "@/*": ["src/*"]
    },
    "sourceMap": true,
    "strict": true,
    "target": "es6",
    "typeRoots": [
      "node_modules/@types",
      "./src/@types"
    ]
  },
  "include": [
    "./src/**/*"
  ]
}
```

- Replace the content of `tslint.json` with:

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
      /** "check-format": allows only lowerCamelCased or UPPER_CASED variable names
          "allow-leading-underscore" allows underscores at the beginning.
          "allow-pascal-case" allows PascalCase in addition to lowerCamelCase.
          "ban-keywords": disallows the use of certain TypeScript keywords as variable or parameter names. */
      "variable-name": [true, "ban-keywords", "check-format", "allow-leading-underscore", "allow-pascal-case"]
  }
}
```

- Create `src/@types` and move each `.d.ts` file to it.
- Replace the content of `src/@types/env.d.ts` with:

```ts
declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_AUDIENCE: string;
    AUTH_COOKIE_ACCESS: string;
    AUTH_COOKIE_ID: string;
    AUTH_ISSUER: string;
    AUTH_SECRET: string;
    MYSQL_PASSWORD: string;
    MYSQL_PORT: number;
    NEST_HOST: string;
    NEST_PORT: number;
    NODE_ENV: 'development' | 'production';
    PRISMA_HOST: string;
    PRISMA_MANAGEMENT_API_SECRET: string;
    PRISMA_PORT: number;
    PRISMA_SECRET: string;
    QUASAR_HOST: string;
    QUASAR_PORT: number;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
```

## Skeleton

Rename **pages/Error404.vue** as **pages/app.404.page.vue** : `pages/Error404.vue > pages/app.404.page.vue`

### App.vue > app.vue

```vue
<template lang="pug">
  #q-app: router-view
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class App extends Vue {}
</script>
```

### pages/Index.vue > pages/app.page.vue

```vue
<template lang="pug">
  q-page.flex.flex-center: img(alt="Logo", src="~assets/quasar-logo-full.svg")
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AppPage extends Vue {}
</script>
```

### layouts/MyLayout.vue > layouts/app.layout.vue

```vue
<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header(): q-toolbar(): q-toolbar-title Niama App
    q-page-container(): router-view
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AppLayout extends Vue {}
</script>
```

### router/routes.ts > router/routes.ts

```ts
import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/app.layout.vue'),
    children: [{ path: '', component: () => import('pages/app.page.vue') }],
  },
];

if (process.env.MODE !== 'ssr') routes.push({ path: '*', component: () => import('pages/app.404.page.vue') });

export default routes;
```

## Apollo

Install Quasar Extension for Apollo:

```bash
quasar ext add @quasar/graphql
```

## Server: Prisma (optional)

::: warning
Do not forget to install Prisma and Docker first.
:::

- Install Prisma locally:

```bash
npm i -D prisma
```

- Create `prisma.yml` file in `config` folder:

```yaml
datamodel:
  - ../src/modules/user/b.user.content.datamodel.graphql
endpoint: ${env:PRISMA_HOST}:${env:PRISMA_PORT}
secret: ${env:PRISMA_SECRET}

seed:
  import: ../src/modules/api/b.api.content.seed.graphql

generate:
  - generator: typescript-client
    output: ../src/modules/api/generated
  - generator: graphql-schema
    output: ../src/modules/api/b.api.content.prisma.graphql
```

- Create `config/b.docker.dev.yml`:

```yaml
version: '3'
services:  
  prisma:
    image: prismagraphql/prisma:latest
    restart: always
    ports:
    - ${PRISMA_PORT}:${PRISMA_PORT}
    environment:
      PRISMA_CONFIG: |
        port: ${PRISMA_PORT}
        managementApiSecret: ${PRISMA_MANAGEMENT_API_SECRET}
        databases:
          default:
            connector: mysql
            host: mysql
            port: 3306
            user: root
            password: ${MYSQL_PASSWORD}
            migrations: true
  
  mysql:
    image: mysql:5.7
    restart: always
    ports:
      - ${MYSQL_PORT}:3306
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_PASSWORD}
    volumes:
      - db:/var/lib/mysql

volumes:
  db:
```

- Add `scripts` to `package.json`:

```json
{
  ...
  "scripts": {
    ...
    "dev:prisma": "cd config && prisma deploy -e ../.env.dev",
    ...
  }
  ...
}
```

## Server: NestJS (optional)

### Packages installation

```bash
npm i @nestjs/core @nestjs/common rxjs reflect-metadata
npm i -D @types/dotenv dotenv nodemon ts-node@7 tsconfig-paths
```

### config/b.nodemon.json

```json
{
  "watch": ["src/**/b.*.ts","src/**/u.*.ts"],
  "ext": "ts",
  "exec": "ts-node -P config/b.ts.json -r dotenv/config -r tsconfig-paths/register src/b.main.ts dotenv_config_path=.env.dev"
}

```

### Scripts to add to package.json 

```json
{
  ...
  "scripts": {
    ...
    "dev:nest": "nodemon --config config/b.nodemon.json",
    ...
  }
  ...
}
```

### src/b.main.ts

```ts
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/b.app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: true, origin: [`${process.env.QUASAR_HOST}:${process.env.QUASAR_PORT}`] },
  });
  // app.useGlobalGuards(new AuthJwtG()).use(cookieParser());
  await app.listen(process.env.NEST_PORT);
}
bootstrap();
```