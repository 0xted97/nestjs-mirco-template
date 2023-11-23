ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}

WORKDIR /app

COPY *.json pnpm-lock.yaml ./

COPY ./libs ./libs 
COPY ./apps/user-gateway/ ./apps/user-gateway

RUN npm i -g pnpm

RUN pnpm install

RUN pnpm run build user-gateway

CMD ["node", "dist/apps/user-gateway/main"]
