FROM node:20 as todo-frontend

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=todo-frontend /usr/src/app/dist /usr/share/nginx/html