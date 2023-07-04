FROM node:18-alpine AS build

WORKDIR /mono
RUN npm i -g pnpm

COPY --from=base . .
RUN pnpm --filter=@a-luna/shared-ui install
RUN pnpm --filter=@a-luna/shared-ui run build
RUN pnpm --filter=@a-luna/portfolio install
RUN pnpm --filter=@a-luna/portfolio run build

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