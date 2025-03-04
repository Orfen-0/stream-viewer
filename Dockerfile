FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./
RUN if [ -f yarn.lock ]; then yarn install; else npm install; fi
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
