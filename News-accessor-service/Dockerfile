# Use the official Node.js image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose application port
EXPOSE 3010

# Start the application
CMD ["node", "src/app.js"]
