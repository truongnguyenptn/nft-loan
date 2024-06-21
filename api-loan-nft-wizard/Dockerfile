FROM node:16

WORKDIR /api-helius-webhooks
COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
CMD yarn start