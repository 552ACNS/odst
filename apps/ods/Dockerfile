# First Stage
FROM node:lts-alpine AS develop

ARG APP="ods"

ARG ARG_NODE_ENV=development

ENV NODE_ENV=${ARG_NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

# TODO remove legeacy-peer-deps
# TODO add --omit=dev, but ngcc doesn't get installed then
RUN npm install --ignore-scripts --legacy-peer-deps --progress=false --audit=false --loglevel=error

COPY . .

RUN node ./decorate-angular-cli.js

RUN yarn ngcc --properties es2015 browser module main

RUN npx graphql-codegen --config graphql.codegen.yml

RUN npm run build ${APP}:build:${NODE_ENV}


# Second Stage
FROM nginx:alpine AS deploy

ARG APP="ods"

ARG ARG_NODE_ENV=development

ENV NODE_ENV=${ARG_NODE_ENV}

WORKDIR /usr/src/app

COPY --from=develop /usr/src/app/dist/apps/${APP} /usr/share/nginx/html

