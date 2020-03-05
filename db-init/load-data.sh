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
# For this exercise we only need read-only access
psql -v ON_ERROR_STOP=1 -U postgres --set=data_api_pass=${USER_PASSWORD} <<EOSQL
  CREATE USER data_api PASSWORD :'data_api_pass';
  REVOKE ALL ON ALL TABLES IN SCHEMA public FROM data_api;
  GRANT USAGE ON SCHEMA public TO data_api;
  GRANT SELECT ON ALL TABLES IN SCHEMA public TO data_api;
EOSQL
