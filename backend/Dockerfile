
FROM node:20.9.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8000

CMD ["yarn", "start"]
