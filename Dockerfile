# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file into the container (ensure the file is present)
COPY .env .env

# Expose the port your app will run on
EXPOSE 5000

# Run the app
CMD ["node", "app.js"]

