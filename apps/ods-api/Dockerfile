# First Stage
FROM node:lts-alpine AS build

ARG APP="ods-api"

ARG ARG_NODE_ENV=production

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

ARG ARG_NODE_ENV=production

ENV NODE_ENV=${ARG_NODE_ENV}

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma

COPY package.json ./

#TODO --omit=dev
#ideally we'd omit dev dependencies, but typescript is required for prisma generate and bcrypt was throwing an error
RUN npm install --ignore-scripts --omit=dev --legacy-peer-deps --progress=false --audit=false --loglevel=error

# RUN npm i typescript@4.6.2

# RUN npx nx run-many --target=prisma-generate --all --parallel=false

COPY --from=develop /usr/src/app/dist/apps/${APP} ./

CMD ["node", "./main"]
