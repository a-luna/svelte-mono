FROM node:18-alpine AS build

WORKDIR /app

RUN npm install --global pnpm
COPY --from=base . .

RUN pnpm install --no-frozen-lockfile
RUN pnpm --filter=@a-luna/portfolio build 

# Deploy the production dependencies
FROM node:18-alpine AS pruned

WORKDIR /app
RUN npm install --global pnpm
COPY --from=build . .
RUN mkdir pruned && pnpm --filter=@a-luna/portfolio deploy --prod pruned

# Final production image
FROM node:18-alpine

WORKDIR /app

COPY --from=pruned /app/pruned/dist dist
COPY --from=pruned /app/pruned/node_modules node_modules

ENTRYPOINT ["node", "dist/index.js"]