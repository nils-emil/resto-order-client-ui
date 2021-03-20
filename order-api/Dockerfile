FROM node:alpine
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
ENV DATABASE_URL=localhost

EXPOSE 4000
CMD [ "npm", "run", "dockerStart" ]