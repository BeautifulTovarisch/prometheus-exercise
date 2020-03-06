"""
City

Model representing a city in a particular country.

SCHEMA:

Table Name: city

    - id
    - name
    - countrycode
    - district
    - population

FUNCTIONS:

Database functions to abstract City CRUD operations. Connection are returned to pool after
each operation.

    - fetch: Query a city by ID
    - search: Query a city by country code
    - update: Update an existing city
    - create: Create a new city
    - delete: Remove a city
"""

from sqlalchemy import (
    Table,
    Column,
    String,
    Integer,
    MetaData
)

from database.mod import create_db_engine

City = Table('city', MetaData(create_db_engine),
             Column('id', Integer, primary_key=True),
             Column('name', String),
             Column('countrycode', String(3)),
             Column('district', String),
             Column('population', Integer))

def create(conn, city):
    try:
        insert = City.insert().values(name=city['name'],
                                      district=city['district'],
                                      population=city['population'],
                                      countrycode=city['countrycode'])
        result = conn.execute(insert)

        return result.inserted_primary_key

    except Exception as err:
        print(err)

    finally:
        conn.close()

def fetch(conn, id):
    conn.close()
