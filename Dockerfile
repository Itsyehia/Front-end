# Use Node.js as the base image for building the application
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /opt/app

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

# Use nginx as the base image for serving the application
FROM nginx:stable-alpine

# Create writable temporary directories for Nginx (avoiding permission issues)
RUN mkdir -p /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp && \
    chmod -R 777 /tmp

# Copy the built Angular files to the nginx web server
COPY --from=build /opt/app/dist /usr/share/nginx/html

# Copy a default nginx configuration file for Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
