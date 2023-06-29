ARG NODE_IMAGE=node:18.12.1-alpine

FROM $NODE_IMAGE AS base
RUN apk add --no-cache dumb-init
RUN mkdir -p /usr/src/app && chown node:node /usr/src/app
WORKDIR /usr/src/app
RUN mkdir tmp

FROM base AS dependencies
COPY package.json ./
RUN yarn install
COPY . .

FROM dependencies AS build
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN yarn build

FROM base AS production
ENV PORT=80
ENV HOST=0.0.0.0
COPY ./package*.json ./
RUN yarn install --production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 80

CMD [ "dumb-init", "node", "dist/main.js" ]