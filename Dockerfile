FROM node:18-alpine

WORKDIR /app
COPY . .

RUN npm install

RUN chmod +x ./node_modules/.bin/vite

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]
