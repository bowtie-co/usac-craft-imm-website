FROM php:7.2-apache

LABEL maintainer "Charlie McClung <charlie@bowtie.co>"

RUN apt-get update && apt-get install -y \
    vim build-essential mysql-client git zip unzip \
    libmcrypt-dev libfreetype6-dev zlib1g-dev libpng-dev libjpeg62-turbo-dev

RUN pecl install redis \
    && pecl install xdebug

RUN docker-php-ext-enable redis xdebug

RUN docker-php-ext-install -j$(nproc) opcache pdo pdo_mysql mysqli zip

RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

RUN a2enmod headers rewrite

COPY conf/usac_org.conf /etc/apache2/sites-available/

RUN ln -s /etc/apache2/sites-available/usac_org.conf /etc/apache2/sites-enabled/

ENV DOCROOT /var/www/usacycling_org

RUN mkdir -p $DOCROOT

WORKDIR $DOCROOT

COPY site ./site
COPY craft ./craft

# # Modify PHP
# RUN sed -i 's/memory_limit = 128M/memory_limit = 256M/' /etc/php-7.0.ini
# RUN sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 128M/' /etc/php-7.0.ini
# RUN sed -i 's/post_max_size = 8M/post_max_size = 128M/' /etc/php-7.0.ini

# # Create default index
# RUN printf "HB\n" > /var/www/html/index.html
# RUN printf "<VirtualHost _default_:80>\nDocumentRoot /var/www/html\n</Virtualhost>" > /etc/httpd/conf.d/000-default.conf

# Copy Entrypoint & wait-for-it
COPY wait-for-it.sh /
COPY docker-entrypoint.sh /
RUN chmod +x /*.sh

# Set Entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80
CMD ["apache2", "-D", "FOREGROUND"]
