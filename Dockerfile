# Pull amazonlinux latest
FROM amazonlinux:1
MAINTAINER Caleb Collins <ccollins@imm.com>

# Update yum
RUN yum -y update

# Install packages
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum -y install which wget vim postfix less httpd24 mysql56 \
    php70 php70-opcache php70-mysqlnd php70-mbstring php70-mcrypt \
    php70-json php70-pdo php70-gd php70-pecl-imagick \
    gcc-c++ make nodejs

RUN curl https://squizlabs.github.io/PHP_CodeSniffer/phpcs.phar -o \
      /usr/local/bin/phpcs && chmod +x /usr/local/bin/phpcs

RUN /usr/local/bin/phpcs --config-set show_progress 1 && \
      /usr/local/bin/phpcs --config-set colors 1 && \
      /usr/local/bin/phpcs --config-set report_width 140 && \
      /usr/local/bin/phpcs --config-set encoding utf-8

# Modify PHP
RUN sed -i 's/memory_limit = 128M/memory_limit = 256M/' /etc/php-7.0.ini
RUN sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 128M/' /etc/php-7.0.ini
RUN sed -i 's/post_max_size = 8M/post_max_size = 128M/' /etc/php-7.0.ini

# Create default index
RUN printf "HB\n" > /var/www/html/index.html
RUN printf "<VirtualHost _default_:80>\nDocumentRoot /var/www/html\n</Virtualhost>" > /etc/httpd/conf.d/000-default.conf

# Copy Entrypoint & wait-for-it
COPY wait-for-it.sh /
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh && chmod +x /wait-for-it.sh

# Set Entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80
CMD ["/usr/sbin/apachectl", "-D", "FOREGROUND"]
