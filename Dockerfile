# Step 1: Build the Angular application using Node.js
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli@16

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular application for production
RUN ng build --configuration production --output-path=dist

# Step 2: Set up Nginx to serve the production files
FROM nginx:stable-alpine

# Copy the Nginx configuration file
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy the built Angular files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 (because Nginx will serve the app on this port)
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
