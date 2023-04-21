FROM node:18

RUN npm i -g nodemon
RUN mkdir -p /home/Recetario

WORKDIR /home/Recetario

EXPOSE 3000

COPY package.json package.json

RUN npm install

COPY . .

CMD ["node", "app/index.js"]
