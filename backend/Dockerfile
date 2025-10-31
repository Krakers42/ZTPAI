FROM node:20-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate || true

EXPOSE 5000

CMD ["npm", "run", "dev"]
