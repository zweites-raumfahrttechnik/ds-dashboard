FROM node:18-buster-slim as compile

COPY package.json .

RUN npm config set registry https://registry.npm.taobao.org/ && \
  npm install -g pnpm && \
  pnpm i

COPY . .
RUN pnpm run build

FROM nginx:stable-alpine

COPY --from=compile dist /usr/share/nginx/html/
