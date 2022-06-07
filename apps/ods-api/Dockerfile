# First Stage
FROM node:lts-alpine AS build

ARG APP="ods-api"

WORKDIR /usr/src/app

RUN npm install -g nx --ignore-scripts --legacy-peer-deps --progress=false --audit=false --loglevel=error

COPY package.json ./

RUN npm install --ignore-scripts --omit=optional --legacy-peer-deps --progress=false --audit=false --loglevel=error

COPY . .

#tree shaking is requring waypoint to be run still
RUN npx nx run-many --target=prisma-generate --all --parallel=false

#this fails (with no debug logs) when run via `npm run build`
#Could be related to the --omit or the --legacy-peer-deps.
RUN nx build ods-api


# Second Stage
FROM node:lts-alpine AS deploy

ARG APP="ods-api"

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma

COPY package.json ./

RUN npm install --ignore-scripts --omit=dev --legacy-peer-deps --progress=false --audit=false --loglevel=error

COPY --from=build /usr/src/app/dist/apps/${APP} ./

CMD ["node", "./main"]
