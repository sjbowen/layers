FROM node:alpine

COPY . /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/more.conf
