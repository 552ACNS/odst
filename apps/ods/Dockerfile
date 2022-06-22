# First Stage
FROM node:lts-alpine AS build

ARG APP="ods"

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --ignore-scripts --no-progress --frozen-lockfile --loglevel=error

COPY . .

RUN node ./decorate-angular-cli.js

RUN yarn ngcc --properties es2015 browser module main

RUN yarn graphql-codegen --config graphql.codegen.yml

RUN yarn nx build ${APP}


# Second Stage
FROM nginx:alpine AS deploy

ARG APP="ods"

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist/apps/${APP} /usr/share/nginx/html

RUN sed -i '/location \/ {/a \\ttry_files $uri $uri\/ \/index.html;' /etc/nginx/conf.d/default.conf

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
