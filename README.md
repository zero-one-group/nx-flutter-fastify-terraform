# Nx Flutter FastifyT erraform

This project was generated using [Nx](https://nx.dev).

🔎 **Smart, Fast and Extensible Build System**

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a>
      <ul>
        <li><a href="#mobile">omnichannel</a></li>
        <li><a href="#api">api</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

### Built With

Please Read all the documentation first before getting started.

- [Nx](https://nx.dev/)
- [Nx-Node](https://nx.dev/node)
- [Kysely 0.14.1](https://github.com/koskimas/kysely/tree/0.14.1)
- [Typebox](https://github.com/sinclairzx81/typebox)
- [ts-belt](https://github.com/mobily/ts-belt)
- [Nx-Flutter](https://www.npmjs.com/package/@nxrocks/nx-flutter)

Read all / follow the resources

- course: https://egghead.io/courses/scale-react-development-with-nx-4038
- book: https://cdn2.hubspot.net/hubfs/2757427/effective-react-with-nx-preview.v0.5.pdf
- folder_structure: https://nx.dev/guides/monorepo-nx-enterprise

## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/zero-one-group/nx-flutter-fastify-terraform
   ```
2. Install packages
   ```sh
   yarn
   ```
3. Build all node packages
   ```sh
   yarn build:all
   ```

### mobile

- Please read documentation about Flutter and [Nx-Flutter](https://www.npmjs.com/package/@nxrocks/nx-flutter)
- ZOG example flutter app on Nx https://github.com/zero-one-group/ionic-react-native-flutter
- ZOG Blog about Hybrid App comparison on Nx https://github.com/zero-one-group/ionic-react-native-flutter

### api

#### Database preparation

You can set up your own postgresql or just use provided docker-compose.

```sh
docker-compose up -d db

Creating api_db_1 ... done
```

Run migration by using `migration-cli` for help `yarn migrate --help`

```sh
yarn migrate latest
```

To run the api dev server:

```sh
yarn start api
```

How to contribute on api development.

1. Create your database migration file. e.g

```sh
touch ./apps/migration-cli/src/app/migrations/$(date '+%Y%m%d%H%M%S')_users.ts
```

2. Create your database schema on api-database project. e.g

```sh
touch ./libs/api/database/src/lib/user.row.ts
```

example of the file

```typescript
import { Static, Type } from '@sinclair/typebox';

import { Nullable } from './generics';

export const UserRowSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  password: Type.String(),
  is_active: Type.Boolean(),
  is_admin: Type.Boolean(),
  last_login: Nullable(Type.String()),
  created_at: Type.String(),
  updated_at: Type.String(),
  deleted_at: Nullable(Type.String()),
});

export type UserRow = Static<typeof UserRowSchema>;
```

don't forget to add on database.ts

```typescript
import { UserRow } from './user.row';

export interface Database {
  users: UserRow;
}
```
