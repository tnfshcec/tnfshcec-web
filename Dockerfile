FROM node:lts-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

ARG BASE_PATH

COPY . .
ENV NODE_ENV=production
ENV BASE_PATH=${BASE_PATH}
RUN npm run build

EXPOSE 3000
CMD ["node", "build"]
