FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm install -g serve

CMD ["serve", "dist/", "-l", "8080"]