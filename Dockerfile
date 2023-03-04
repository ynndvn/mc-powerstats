FROM node:18-alpine as build-stage
# Install deps
COPY ./package* ./
RUN npm install && \
    npm cache clean --force && \
    npm run build
COPY . .
# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 1359

FROM nginx:1.15
# Start the app
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
