FROM node:20-apline
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV PORT=3000
EXPOSE $PORT
CMD ["npm", "start"]