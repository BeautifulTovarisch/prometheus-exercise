#!/bin/bash

set -euo pipefail

# Initialization script for world dataset.
# Creates non-root database role with restricted privileges
# for use with Flask backend.
#
# Additionally loads world.sql dataset normally

# Load world.sql
psql -v -U postgres -f /docker-entrypoint-initdb.d/sql/world.sql

# Revoke and whitelist privileges
# For this exercise we only need write access on the city table
psql -v ON_ERROR_STOP=1 -U postgres --set=data_api_pass=${USER_PASSWORD} <<EOSQL
  CREATE USER data_api PASSWORD :'data_api_pass';
  REVOKE ALL ON ALL TABLES IN SCHEMA public FROM data_api;
  GRANT USAGE ON SCHEMA public TO data_api;
  GRANT SELECT ON ALL TABLES IN SCHEMA public TO data_api;
  GRANT INSERT, UPDATE, DELETE ON TABLE city TO data_api;

  -- Create sequence in order to benefit from autoincrementing ids
  -- Only necessary for city as creation is enabled
  CREATE SEQUENCE IF NOT EXISTS city_seq AS INTEGER
    START WITH 4080
    INCREMENT BY 1;

  GRANT USAGE ON SEQUENCE city_seq TO data_api;

  ALTER TABLE city ALTER COLUMN id SET DEFAULT nextval('city_seq');
EOSQL
