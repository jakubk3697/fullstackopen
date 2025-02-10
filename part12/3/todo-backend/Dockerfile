FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=todo-express-backend:*

ENV MONGO_URL=${MONGO_URL}
ENV REDIS_URL=${REDIS_URL}

USER node

CMD npm start