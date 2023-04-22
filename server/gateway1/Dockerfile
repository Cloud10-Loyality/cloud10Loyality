FROM node:18

WORKDIR /app

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn

COPY . .

# RUN yarn build

EXPOSE 5000

CMD ["yarn", "dev"]

