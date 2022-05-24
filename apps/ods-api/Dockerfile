# First Stage
FROM node:lts-alpine AS development

ENV APP="ods-api"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=optional --legacy-peer-deps

COPY . .

RUN nx build ${APP}

# Second Stage
FROM node:lts-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD nx serve ${APP}
