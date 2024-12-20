# Use Node.js as the base image
FROM node:18-alpine

# Create a non-root user
RUN adduser -D angularuser

# Set the working directory inside the container
WORKDIR /app

# Set permissions for the non-root user
RUN chown -R angularuser /app

# Switch to the non-root user
USER angularuser

# Install Angular CLI globally
RUN npm install -g @angular/cli@16

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose port 4200 to the host
EXPOSE 4200

# Run the Angular application using ng serve
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
