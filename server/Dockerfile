FROM node:19-alpine3.16

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start", "npm", "test"]