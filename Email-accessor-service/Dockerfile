# Base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./



RUN npm install
# Copy the application code
COPY . .

# Expose the port
EXPOSE 3013

# Start the application
CMD ["node", "src/app.js"]