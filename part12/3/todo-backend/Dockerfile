FROM node:20 as backend-base

WORKDIR /usr/src/app

COPY package*.json ./

# Development build stage
FROM backend-base as backend-dev
RUN npm install
COPY . .
ENV DEBUG=todo-express-backend:*
USER node
CMD ["npm", "run", "dev"]

# Production build stage
FROM backend-base as backend-prod
RUN npm ci --only=production
COPY --chown=node:node . .
ENV DEBUG=todo-express-backend:*
ENV MONGO_URL=${MONGO_URL}
ENV REDIS_URL=${REDIS_URL}
USER node
CMD ["npm", "start"]