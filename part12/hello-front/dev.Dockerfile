FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# Fix the CMD instruction to properly start Vite in development mode
CMD ["sh", "-c", "npm run dev -- --host"]