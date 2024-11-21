# Base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./



# Update apt-get and install ca-certificates
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port
EXPOSE 3013

# Start the application
CMD ["node", "src/app.js"] # מסלול מלא לקובץ app.js בתיקייה src
