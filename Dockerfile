FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "server.js" ]
