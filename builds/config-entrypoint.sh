#!/bin/sh
while ! nc -z configuration-service 8888 ; do
    echo "Waiting for upcoming Config Server"
    sleep 2
done
java -jar ./docker/$1