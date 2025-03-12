# Stage 1: Test stage
FROM node:20 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

# Run tests
RUN npm run test

# Stage 2: Build stage
FROM node:20 AS build-stage 

WORKDIR /usr/src/app

# We can reuse the node_modules from the test stage
COPY --from=test-stage /usr/src/app/node_modules ./node_modules
COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm run build

# Stage 3: Production stage
FROM nginx:1.25-alpine

# COPY the directory dist from the build-stage to /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html