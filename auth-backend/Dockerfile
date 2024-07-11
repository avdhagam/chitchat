FROM --platform=linux/amd64 node:lts-alpine3.19

WORKDIR /app

COPY . /app

RUN npm install

COPY .dockerignore /app/.dockerignore

CMD ["npm","run","start"]
