# Use node 8 smallest image
FROM node:8.16.2-alpine
# Create source directory
RUN mkdir -p /usr/src
# Set as working directory
WORKDIR /usr/src
# Copy builded sources and node_modules
COPY ./dist .
COPY ./node_modules ./node_modules
# Expose running port
EXPOSE 6668
# Set "node index.js" as default executed command
CMD [ "node", "index.js" ]