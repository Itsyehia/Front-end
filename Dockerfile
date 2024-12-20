# Use Node.js as the base image
FROM node:18-alpine

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

# Set permissions to allow OpenShift's default user to access the application
RUN chmod -R g+rwX /opt/app && chown -R 1001:0 /opt/app

# Expose port 4200 for the Angular development server
EXPOSE 4200

# Use a non-root user (OpenShift assigns the user dynamically)
USER 1001

# Run the Angular application using ng serve
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
