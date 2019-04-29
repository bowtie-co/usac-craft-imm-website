#!/usr/bin/env bash

# Bail if we b0rk
set -e

# Wait for MySQL
# /wait-for-it.sh $MYSQL_HOST:$MYSQL_PORT -t 90

# Install App
chown -R apache:apache $DOCROOT/craft/app
chown -R apache:apache $DOCROOT/craft/config
chown -R apache:apache $DOCROOT/craft/storage
find $DOCROOT -type d -exec chmod 775 {} \;
find $DOCROOT -type f -exec chmod 664 {} \;

# Execute the CMD from the Dockerfile and pass in all of its arguments.
exec "$@"
