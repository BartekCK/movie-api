FROM node:14.15-alpine
WORKDIR /usr/app/server

COPY . .
RUN npm i

RUN npm run build
CMD ["npm","start"]
