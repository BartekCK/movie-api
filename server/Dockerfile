FROM node:14.15-alpine
WORKDIR /usr/app/server

COPY . .
RUN npm i

#ENV MONGOMS_DEBUG=1
#ENV MONGOMS_SYSTEM_BINARY=/root/.cache/mongodb-binaries/4.0.14/mongod

RUN npm run build
CMD ["npm","start"]
