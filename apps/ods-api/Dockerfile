# First Stage
FROM node:lts-alpine AS develop

ARG APP="ods-api"

ARG ARG_NODE_ENV=development

ENV NODE_ENV=${ARG_NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

# TODO remove legeacy-peer-deps
RUN npm install --ignore-scripts --omit=optional --legacy-peer-deps --progress=false --audit=false --loglevel=error

COPY . .

#tree shaking is requring waypoint to be run still
RUN npx nx run-many --target=prisma-generate --all --parallel=false

RUN npm run build ${APP}:build:${NODE_ENV}


# Second Stage
FROM node:lts-alpine AS deploy

ARG APP="ods-api"

ARG ARG_NODE_ENV=development

ENV NODE_ENV=${ARG_NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --ignore-scripts --omit=dev --legacy-peer-deps --progress=false --audit=false --loglevel=error

COPY . .

COPY --from=develop /usr/src/app/dist/apps/${APP} ./dist/apps/${APP}

CMD ["node", "./dist/apps/${APP}/main"]
