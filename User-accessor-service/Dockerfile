# Use the official Node.js image as a base
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Mount the shared Dapr directory


# Expose the application's port
EXPOSE 3001

# Run daprd and the app
CMD ["node", "src/app.js"]
