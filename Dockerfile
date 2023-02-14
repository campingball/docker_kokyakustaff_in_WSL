FROM node:16-alpine3.14

WORKDIR /var/www/html

RUN apk update && npm install -g npm


EXPOSE 3000

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=3000