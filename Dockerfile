FROM node:19.2-alpine3.16 

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && rm -rf node_modules && npm install --prod 

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build


EXPOSE 3000

CMD ["npm", "run", "start:prod"]