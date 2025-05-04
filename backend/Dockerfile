# Dockerfile para o backend
FROM node:18

WORKDIR /backend

COPY ./backend/package.json ./backend/package-lock.json ./

RUN npm install

COPY ./backend /backend

EXPOSE 5000

CMD ["npm", "start"] 