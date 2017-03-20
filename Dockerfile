FROM nginx
MAINTAINER Long Zhao Bi "714037058@qq.com"

ADD ./dist /usr/share/nginx/html
ADD default.conf /etc/nginx/conf.d/default.conf
