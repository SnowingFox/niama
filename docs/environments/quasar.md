# Quasar

## Skeleton

In the appropriate folder, use **Quasar CLI** to initialize your project :

```bash
quasar create <folder_name>
```

## Prettier

Install **prettier** package :

```bash
yarn add -D prettier
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

## Pug

Install **Niama Quasar Extension** for **Pug** :

```bash
quasar ext add @niama/pug
```

## Typescript

Install **Niama Quasar Extension** for **Typescript** :

```bash
quasar ext add @niama/ts
```

## Environment files

- Install **dotenv** :

```bash
yarn add -D dotenv
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

- Add `scripts` to `package.json` :

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