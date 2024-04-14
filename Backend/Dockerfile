
# install linux alpine(specific version)+node.js(specific version)
FROM node:20-alpine3.19

# install global installation needed inside a terminal(no need for nodemon in production):
RUN npm i -g ts-node

# create app folder inside thr image - at root level + make it the current directory:
WORKDIR /app

# Copy package.json and package-lock.json from root (.) into image /app folder:
COPY package*.json /app

# Install packeges:
RUN npm i

# copy source files from developer computer to the /app folder inside the image:
COPY . /app

# specify which terminal command will run the application:
ENTRYPOINT npm start
