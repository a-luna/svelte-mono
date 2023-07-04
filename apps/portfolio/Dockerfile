FROM node:18-alpine AS base
RUN npm i -g pnpm

FROM base AS dependencies
WORKDIR /app
COPY . .
RUN pnpm install

FROM dependencies as build
RUN pnpm -r build

FROM build as pruned
WORKDIR /app
RUN pnpm --filter backend deploy pruned

FROM base as development
WORKDIR /app
COPY --from=pruned /app/pruned .

FROM base as deploy
WORKDIR /app
ENV NODE_ENV=production
COPY --from=pruned /app/pruned/build .
COPY --from=pruned /app/pruned/node_modules node_modules
ENTRYPOINT ["node", "index.js"]