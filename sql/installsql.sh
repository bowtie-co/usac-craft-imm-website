#!/usr/bin/env bash
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD usa_cycling_uat < /docker-entrypoint-initdb.d/latest.sql
