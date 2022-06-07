# Odst

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@odst/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## Admin user account for graphql API access

password: `admin`<br/>
username: `admin`

## Docker

### Build image locally

`docker build . --file ./apps/{app}/Dockerfile`

### Build & push via nx

`nx docker {app}`

Careful with this, due to that it pushes it up with the `:latest` tag. Add `--outputs=type=local` to not push built images up to registry.

### Migrate database via docker

`docker-compose -f ./docker-compose.yml -f ./docker-compose.migrate.yml up prisma-migrate`

But first you need a migration to apply - run `nx run ods-api:prisma-migrate:migrate`

### start all services listed in docker-compose

`docker-compose up`

add `-d` to start them in the background; add `{app}` to the end to start only a specific app.

### Start to finish full docker stack

```bash
# datbase
docker-compose up -d postgres
# create migration
#once we have migrations commited (and they're up to date), this step won't be required
nx run {app}:prisma-migrate:migrate
# deploy migration
docker-compose -f ./docker-compose.yml -f ./docker-compose.migrate.yml up prisma-migrate
# start services
docker-compose up -d


```

### Why is `npm` being used in Dockerfiles instead of `yarn`?

`npm` allows skipping post install script, whichs increases likelihood of caching, along with not running pointless commands (i.e. ngcc while building backend).

## Common Troubleshooting steps

### - `yarn` throws graphql error

This could be because you've made changes to the schema and not rerun the backend. Serving the backend, running `yarn` again will ensure graphql schema and types will be generated properly.

### - Webpack config errors on frontend

Need to remove prisma references from frontend and only use the generated graphQL files.

### - New prisma database

When creating a new prisma database, you need to specify what project it is made for in the prisma.schema under outputs.

### - Tailwind isn't working w/ Material

Ensure that you marked Tailwind as "Important" under tailwind config.

### - No loader available on a .graphql file in frontend

Don't import from the .graphql file, import from .generated file

### - "excesive stack depth" error on prisma/graphql types

coercion the type to the expected prisma type. Will probably need to do it on resolver.
example: `UserWhereInput as Prisma.UserWhereInput`
