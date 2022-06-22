#!/bin/bash

#download files
curl -q https://raw.githubusercontent.com/552ACNS/odst/docker-recreate-images/docker-compose.yml > docker-compose.yml
curl -q https://raw.githubusercontent.com/552ACNS/odst/docker-recreate-images/.env > .env

#pull new images
docker-compose pull

#migrate database
docker-compose up ods-migrate

#stack stack
docker-compose up ods -d
