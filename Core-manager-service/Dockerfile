# Base image for Node.js
FROM node:16

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port on which the app will run (defined in .env or defaults to 3015)
EXPOSE 3015

# Default command to run the application
CMD ["node", "src/app.js"]