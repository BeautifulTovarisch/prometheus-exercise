from os import getenv

from sqlalchemy import create_engine

def create_db_engine():
    db_string = f'postgres://data_api:{getenv("USER_PASSWORD")}@database:5432/postgres'
    return create_engine(db_string, pool_size=15)
