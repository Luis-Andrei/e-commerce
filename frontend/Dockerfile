# Dockerfile para o frontend
FROM node:18

WORKDIR /frontend

COPY ./frontend/package.json ./frontend/package-lock.json ./

RUN npm install

COPY ./frontend /frontend

EXPOSE 3000

CMD ["npm", "start"] 