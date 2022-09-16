FROM node:16

WORKDIR /app
COPY . .

RUN npm config set unsafe-perm true
RUN npm install

CMD ["npm", "run", "watch"]
