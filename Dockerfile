FROM node:15

WORKDIR /app
COPY . .

RUN npm config set unsafe-perm true
RUN npm install

CMD ["npm", "start"]
