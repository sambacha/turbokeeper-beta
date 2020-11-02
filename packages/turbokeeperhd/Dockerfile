FROM node:10

RUN npm i -g yarn

ENV YARN_CACHE_FOLDER /yarn


ADD package.json yarn.lock /tmp/
ADD .yarn-cache.tgz /

RUN cd /tmp && yarn
RUN mkdir -p /usr/src/relayer && cd /usr/src/relayer && ln -s /tmp/node_modules

COPY package*.json ./

WORKDIR /usr/src/relayer


RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "js/server.js" ]
