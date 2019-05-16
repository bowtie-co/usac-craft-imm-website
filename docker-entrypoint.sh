#!/usr/bin/env bash

# Bail if we b0rk
set -e

source /etc/apache2/envvars

# Wait for MySQL
# /wait-for-it.sh $MYSQL_HOST:$MYSQL_PORT -t 90

# Install App
chown -R www-data:www-data $DOCROOT/craft/app
chown -R www-data:www-data $DOCROOT/craft/config
chown -R www-data:www-data $DOCROOT/craft/storage
# find $DOCROOT -type d -exec chmod 775 {} \;
# find $DOCROOT -type f -exec chmod 664 {} \;

# Execute the CMD from the Dockerfile and pass in all of its arguments.
exec "$@"
