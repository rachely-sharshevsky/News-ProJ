# Base image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the service port
EXPOSE 3014

# Run the application
CMD ["node", "src/app.js"]