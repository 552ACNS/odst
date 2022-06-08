# First Stage
FROM node:lts-alpine AS build

ARG APP="ods"

WORKDIR /usr/src/app

COPY package.json yarn.lock skip-postinstall.js ./

# TODO remove legeacy-peer-deps
# TODO add --omit=dev, but ngcc doesn't get installed then
RUN SKIP_POSTINSTALL=1 yarn --no-progress --frozen-lockfile --loglevel=error

COPY . .

RUN node ./decorate-angular-cli.js

RUN yarn ngcc --properties es2015 browser module main

RUN npx graphql-codegen --config graphql.codegen.yml

RUN npx nx build ${APP}


# Second Stage
FROM nginx:alpine AS deploy

ARG APP="ods"

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist/apps/${APP} /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
