FROM node:18

WORKDIR /app

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn

COPY . .

# RUN yarn build

EXPOSE 6000

CMD ["yarn", "dev"]

