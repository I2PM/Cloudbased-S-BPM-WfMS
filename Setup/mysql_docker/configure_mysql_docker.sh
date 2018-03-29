#!/usr/bin/env bash

# -- Is needed for replacing the bind-address but for local usage it is not needed --

# cd /etc/mysql/mysql.conf.d
# sleep 0.02
# sed -i -- 's/#bind-address[[:blank:]]*=[[:blank:]]*127.0.0.1/bind-address=0.0.0.0/g' mysqld.cnf
# sleep 0.02
# service mysql restart