FROM node:18-alpine AS build

WORKDIR /mono

RUN npm i -g pnpm
COPY --from=base . .

RUN pnpm install
RUN pnpm -r build

FROM node:18-alpine AS pruned

WORKDIR /mono
RUN npm i -g pnpm
COPY --from=build . .
RUN mkdir pruned && pnpm --filter=@a-luna/portfolio deploy --prod pruned

FROM node:18-alpine

WORKDIR /mono

COPY --from=pruned /mono/pruned/build .
COPY --from=pruned /mono/pruned/node_modules node_modules

ENTRYPOINT ["node", "index.js"]