"""
City

Model representing a city in a particular country.

SCHEMA:

city
    - id
    - name
    - countrycode
    - district
    - population

RAISES:
    - SQLAlchemyError

TODO:
    - Handle more specific exceptions
"""

from sqlalchemy import (
    Table,
    Column,
    String,
    Integer,
    MetaData
)

from sqlalchemy.sql import select
from sqlalchemy.exc import SQLAlchemyError

from database.mod import create_db_engine

City = Table('city', MetaData(create_db_engine()),
             Column('id', Integer, primary_key=True),
             Column('name', String),
             Column('countrycode', String(3)),
             Column('district', String),
             Column('population', Integer))

def create(conn, city):
    try:
        insert = City.insert().values(city)

        result = conn.execute(insert)

        return result.inserted_primary_key[0]

    except SQLAlchemyError as err:
        print(err)

    finally:
        conn.close()

def delete(conn, id):
    try:
        conn.execute(City.delete().where(City.c.id == id))

    except SQLAlchemyError as err:
        print(err)

    finally:
        conn.close()

def update(conn, id, city):
    try:
        update_stmt = City.update() \
                          .where(City.c.id == id) \
                          .values(city)

        conn.execute(update_stmt)
    except SQLAlchemyError as err:
        print(err)

    finally:
        conn.close()

# Fetch cities by country code
def search(conn, country):
    try:
        stmt = City.select().where(City.c.countrycode == country)

        return conn.execute(stmt).fetchall()

    except SQLAlchemyError as err:
        print(err)

    finally:
        conn.close()
