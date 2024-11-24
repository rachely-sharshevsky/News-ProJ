# Use Node.js official image as the base image
FROM node:16-alpine

# Set the working directory in the container

WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the application port
EXPOSE 3011

# Start the application
CMD ["node", "src/app.js"]