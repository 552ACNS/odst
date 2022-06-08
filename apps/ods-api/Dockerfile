# First Stage
FROM node:lts-alpine AS build

ARG APP="ods-api"

WORKDIR /usr/src/app

# RUN yarn global add nx --no-progress --loglevel=error

COPY package.json yarn.lock ./

RUN yarn install --ignore-scripts --no-progress --frozen-lockfile --loglevel=error

COPY . .

#tree shaking is requring waypoint to be run still
#RUn npx nx prisma-generate ${APP}
RUN npx nx run-many --target=prisma-generate --all --parallel=false

RUN nx build ods-api


# Second Stage
FROM node:lts-alpine AS deploy

ARG APP="ods-api"

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma

COPY package.json yarn.lock ./

RUN yarn install --prod --ignore-scripts --no-progress --frozen-lockfile --loglevel=error

COPY --from=build /usr/src/app/dist/apps/${APP} ./

CMD ["node", "./main"]
