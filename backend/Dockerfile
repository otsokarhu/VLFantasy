FROM node:18-alpine as build-image
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src
RUN npm ci
RUN npx tsc

FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=build-image ./usr/src/app/build ./build
RUN npm ci --production
COPY . .
EXPOSE 8080
CMD [ "node", "build/index.js" ]
