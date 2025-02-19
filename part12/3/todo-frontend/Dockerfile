# # Production config
FROM node:20 as frontend-prod

WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build
FROM nginx:1.25-alpine
COPY --from=frontend-prod /usr/src/app/dist /usr/share/nginx/html


# Development config
FROM node:20 as frontend-dev
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 80
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "80"]

# Test config
FROM node:20 as frontend-test
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["npm", "run", "test"]