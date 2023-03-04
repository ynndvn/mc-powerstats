FROM node:18-alpine as build-stage
# Install deps
COPY ./package* ./
COPY . .
RUN npm install && \
    npm cache clean --force && \
    npm run build
# Expose ports (for orchestrators and dynamic reverse proxies)

FROM nginx:stable-alpine
# Start the app
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
