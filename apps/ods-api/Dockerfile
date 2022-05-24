# First Stage
# 1
FROM node:lts-alpine AS development

# 2
ENV APP="ods-api"

# 3
WORKDIR /usr/src/app

# 4
EXPOSE 3343

# 5
COPY package*.json yarn.lock ./

#6
COPY . .

# 7
#RUN npm install --omit=optional --legacy-peer-deps --ignore-scripts
RUN yarn
#--mode skip-build

RUN yarn build ${APP}

# # Second Stage
# FROM node:lts-alpine AS production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --omit=dev

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist

# CMD nx serve ${APP}
