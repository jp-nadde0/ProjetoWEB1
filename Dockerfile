FROM nginx

WORKDIR /usr/share/nginx/html

COPY index.html .
COPY produtos.html .

EXPOSE 80
