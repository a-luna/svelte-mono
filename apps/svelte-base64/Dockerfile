FROM node:18-alpine AS base
RUN npm --no-update-notifier --no-fund --global install pnpm
ARG PACKAGE_PATH=apps/svelte-base64
ARG DEPS_PATH=packages/shared-ui
ENV NODE_ENV=production
WORKDIR /root/monorepo

FROM base AS dev
ENV CI=true
COPY --from=root . .
RUN pnpm run docker-image
RUN node prune_deps.cjs

FROM base as prod
COPY --from=dev /root/monorepo/node_modules node_modules
COPY --from=dev /root/monorepo/package.json .
COPY --from=dev /root/monorepo/pnpm-lock.yaml .
COPY --from=dev /root/monorepo/pnpm-workspace.yaml .
COPY --from=dev /root/monorepo/${DEPS_PATH}/dist ${DEPS_PATH}/dist
COPY --from=dev /root/monorepo/${DEPS_PATH}/node_modules ${DEPS_PATH}/node_modules
COPY --from=dev /root/monorepo/${DEPS_PATH}/package.json ${DEPS_PATH}
COPY --from=dev /root/monorepo/${PACKAGE_PATH}/build ${PACKAGE_PATH}/build
COPY --from=dev /root/monorepo/${PACKAGE_PATH}/node_modules ${PACKAGE_PATH}/node_modules
COPY --from=dev /root/monorepo/${PACKAGE_PATH}/package.json ${PACKAGE_PATH}
ENTRYPOINT ["node", "${PACKAGE_PATH}/build/index.js"]
