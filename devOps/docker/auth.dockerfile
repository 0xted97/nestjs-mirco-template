ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}

WORKDIR /app

COPY *.json pnpm-lock.yaml ./

COPY ./libs ./libs 
COPY ./apps/auth/ ./apps/auth

RUN npm i -g pnpm

RUN pnpm install

RUN pnpm run build auth

CMD ["node", "dist/apps/auth/main"]
