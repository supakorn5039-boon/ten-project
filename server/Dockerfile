# Use the official Node.js image as the base image
FROM node:19

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock)
# to leverage Docker's cache for faster builds
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the project files
COPY . .

# Expose the port that the app will run on (default is 3001)
EXPOSE 8080

# Run Prisma generation (to generate Prisma client based on the schema)
RUN npx prisma generate

# Run prisma for new Models
RUN npx prisma generate --schema=./prisma/schema.prisma

# Run tests using ts-jest directly (on .ts files, not dist)
RUN npx jest

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "run", "dev"]
