FROM mysql:5

COPY db_progetto_cattolica.sql /docker-entrypoint-initdb.d