FROM node:14.4.0-stretch

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN npm install

RUN npm run build

RUN rm -r /usr/src/app/src

EXPOSE 3000

CMD npm run start
