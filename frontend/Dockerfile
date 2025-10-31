FROM node:20-alpine AS dev
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Uruchomienie servera z hostem 0.0.0.0, aby był dostępny z zewnątrz kontenera
CMD ["npm", "run", "dev", "--", "--host"]
