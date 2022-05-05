FROM node:16-alpine

WORKDIR /app

RUN npm install -g ts-node

RUN apk update && apk add bash

EXPOSE 3000
CMD [ "npm", "run", "start.dev" ]
