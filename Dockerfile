FROM node:18-alpine
# Install deps
COPY ./package* ./
RUN npm install && \
    npm cache clean --force
COPY . .
# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 1359
# Start the app
CMD npm start