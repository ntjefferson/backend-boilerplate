# pull official base image
FROM postgres:12.2-alpine

# run create.sql query on init
ADD ./queries/createDevDbs.sql /docker-entrypoint-initdb.d