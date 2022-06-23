# First Stage
FROM node:lts-alpine AS build

ARG APP="ods-api"

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --ignore-scripts --no-progress --frozen-lockfile --loglevel=error

COPY . .

RUN npx nx prisma-generate ${APP}

RUN npx nx build ods-api


# Second Stage
FROM node:lts-alpine AS deploy

ARG APP="ods-api"

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma

COPY package.json yarn.lock ./

#TODO look into slimming this down more. Results in 2.7 GB image layer
RUN yarn install --prod --ignore-scripts --no-progress --frozen-lockfile --loglevel=error

COPY --from=build /usr/src/app/dist/apps/${APP} ./

CMD ["node", "./main"]
