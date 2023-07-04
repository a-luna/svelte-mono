FROM node:18-alpine AS build

WORKDIR /app

RUN npm i -g pnpm
COPY --from=base . .

RUN pnpm install
RUN pnpm -r build

FROM node:18-alpine AS pruned

WORKDIR /app
RUN npm i -g pnpm
COPY --from=build . .
RUN mkdir pruned && pnpm --filter=@a-luna/portfolio deploy --prod pruned

FROM node:18-alpine

WORKDIR /app

COPY --from=pruned /app/pruned/build .
COPY --from=pruned /app/pruned/node_modules node_modules

ENTRYPOINT ["node", "index.js"]