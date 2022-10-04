FROM node:16-alpine

WORKDIR /app

RUN apk update && apk add bash

RUN npm i -g npm@latest

CMD [ "npm", "run", "start.dev" ]
