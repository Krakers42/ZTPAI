FROM node:20-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Tryb dev z HMR i hostem 0.0.0.0, aby działało w Dockerze
CMD ["npm", "run", "dev", "--", "--host"]
