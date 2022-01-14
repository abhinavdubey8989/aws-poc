FROM node:14-alpine

# RUN apk update && apk add build-base git python

WORKDIR /backend

COPY package.json .

COPY tsconfig.json .

# COPY tsconfig.compile.json .

RUN npm i

COPY . .

#to-do use this command 
# RUN npm run build

EXPOSE 8080

#to read correct config.json file , value from compose file
ARG NODE_ENV

# ENV NODE_ENV production

ARG NODE_ENV

# ENV NODE_ENV production

CMD ["npm" , "start"]