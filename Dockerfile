FROM node:23.7-alpine

# Set working directory
WORKDIR /app

# Install required build dependencies
RUN apk add --no-cache python3 make g++ 

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# uninstall the current bcrypt modules
RUN npm uninstall bcrypt

# install the bcrypt modules for the machine
RUN npm install bcrypt

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
