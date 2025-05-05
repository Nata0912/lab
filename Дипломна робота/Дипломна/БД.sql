-- Database: voting_db

-- DROP DATABASE IF EXISTS voting_db;

CREATE DATABASE voting_db
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'uk-UA'
    LC_CTYPE = 'uk-UA'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;