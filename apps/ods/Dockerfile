# First Stage
FROM node:lts-alpine AS develope

ARG APP="ods"

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json yarn.lock angular.json nx.json graphql.codegen.yml ./

# TODO remove legeacy-peer-deps
RUN npm install --ignore-scripts --omit=optional --legacy-peer-deps --progress=false --audit=false --loglevel=error

COPY . .

RUN npx graphql-codegen --config graphql.codegen.yml

RUN npm run build ${APP}:build:${NODE_ENV}


# Second Stage
FROM nginx:alpine AS deploy

ARG APP="ods"

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=develope /usr/src/app/dist/apps/${APP} /usr/share/nginx/html

