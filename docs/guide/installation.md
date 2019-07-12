# Installation

## Quasar Starter

- In the appropriate folder, use **Quasar CLI** to initialize your project :

```bash
quasar create <folder_name>
```

- When you are invited to choose the features to install, uncheck everything.
- Go to the project directory :

```bash
cd <folder_name>
```

- Install **Niama Starter** extension :

```bash
quasar add ext @niama/starter
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