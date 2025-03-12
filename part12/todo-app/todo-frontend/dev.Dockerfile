# Stage 1: Test stage
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the Vite default port
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]