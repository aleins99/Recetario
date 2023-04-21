FROM node:18

RUN npm i -g nodemon
RUN mkdir -p /home/recetario

WORKDIR /home/recetario

EXPOSE 3000

CMD ["node", "app/index.js"]
