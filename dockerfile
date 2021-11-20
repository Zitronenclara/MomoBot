FROM node:14

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app/

ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD ["npm", "start"]