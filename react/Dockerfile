# Use the official Node.js 14 Alpine image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

RUN npm install esbuild

RUN npm i vite
# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 (change if necessary)
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
