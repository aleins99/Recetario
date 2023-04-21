FROM node:18

RUN mkdir -p /home/recetario

COPY . /home/recetario

EXPOSE 3000

CMD ["node", "/home/recetario/app/index.js"]
