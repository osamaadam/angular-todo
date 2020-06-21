FROM node:12-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY server/package.json ./server/
COPY client/package.json ./client/

RUN yarn

COPY . .

RUN yarn client:build && \
  yarn server:build && \
  mv client/dist/client/ server/ && \
  rm -r client && \
  yarn --prod

FROM node:12-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 4200

CMD ["yarn", "server:prod"]
