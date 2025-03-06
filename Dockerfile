FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache git

COPY package.json yarn.lock* package-lock.json* ./
RUN if [ -f yarn.lock ]; then yarn install; else npm install; fi
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
