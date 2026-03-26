FROM node:20-alpine

RUN apk add --no-cache make gcc g++ python3

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

RUN chown -R node:node /app

USER node

EXPOSE 3001

CMD ["node", "app.js"]