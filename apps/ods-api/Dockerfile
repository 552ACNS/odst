# First Stage
FROM node:lts-alpine AS build

ARG APP="ods-api"

WORKDIR /usr/src/app

#nx must be installed globally and `nx build` w/o npx
RUN yarn global add nx --no-progress --loglevel=error

COPY package.json yarn.lock ./

RUN yarn install --ignore-scripts --no-progress --frozen-lockfile --loglevel=error

COPY . .

#tree shaking is requring waypoint to be run still
#RUN npx nx prisma-generate ${APP}
#TODO ensure ods and waypoint are separated
#TODO check if all is still required
RUN npx nx run-many --target=prisma-generate --all --parallel=false

#TODO just changed this to npx, check that this doesn't fail
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
