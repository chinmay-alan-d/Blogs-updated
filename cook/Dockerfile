FROM node:21-alpine3.18
WORKDIR /react-app
COPY ./package*.json /react-app/
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]