"""
Country Model

Module contains representation for country and countrylanguage database tables.

SCHEMA:

country
    - code
    - name
    - continent
    - region
    - surfacearea
    - indepyear
    - population
    - lifeexpectancy
    - gnp
    - gnpold
    - localname
    - governmentform
    - headofstate
    - captial
    - code2

countrylanguage
    - countrycode
    - language
    - isofficial
    - percentage

RAISES:
    - SQLAlchemyError
"""

from sqlalchemy import (
    func,

    Float,
    Table,
    Column,
    String,
    Boolean,
    Numeric,
    Integer,
    MetaData,
    ForeignKey
)

from functools import reduce

from sqlalchemy.sql import select
from sqlalchemy.exc import SQLAlchemyError

from database.mod import create_db_engine

Country = Table('country', MetaData(create_db_engine()),
                Column('code', String(3), primary_key=True),
                Column('name', String),
                Column('continent', String),
                Column('region', String),
                Column('surfacearea', Float),
                Column('indepyear', Integer),
                Column('population', Integer),
                Column('lifeexpectancy', Float),
                Column('gnp', Numeric),
                Column('gnpold', Numeric),
                Column('localname', String),
                Column('governmentform', String),
                Column('headofstate', String),
                Column('capital', Integer, ForeignKey('city.id')),
                Column('code2', String(2)))

Language = Table('countrylanguage', MetaData(create_db_engine()),
                 Column('countrycode', String(3), primary_key=True),
                 Column('language', String, primary_key=True),
                 Column('isofficial', Boolean),
                 Column('percentage', Float))

def fetch_regions(conn, continent):
    try:
        stmt = select([Country.c.region]) \
               .where(func.lower(Country.c.continent) == func.lower(continent)) \
               .group_by('region')

        return conn.execute(stmt).fetchall()

    except SQLAlchemyError as err:
        print(err)

    finally:
        conn.close()

# Only need country code (identifier) and name here
def fetch_countries(conn, region):
    try:
        stmt = select([Country.c.code, Country.c.name]) \
               .where(func.lower(Country.c.region) == func.lower(region))

        return conn.execute(stmt).fetchall()

    except SQLAlchemyError as err:
        print(err)

    finally:
        conn.close()

# Replace any non-serializable attributes with a string
def _map_country(acc, record):
    return {**acc, **record, **{
        'gnp': float(record['gnp'] or 0.0),
        'gnpold': float(record['gnpold'] or 0.0)
    }}

def _map_language(record):
    return {
        "language": record['language'],
        "isofficial": record['isofficial'],
        "percentage": record['percentage']
    }

# Gathers language attributes into convenient collection
def _collate_languages(acc, record):
    acc = _map_country(acc, record)
    acc['languages'].append(_map_language(record))
    return acc

def select_country(conn, country_code):
    try:
        stmt = select([Country, Language]).select_from(
            Country.join(Language,
                         Country.c.code == Language.c.countrycode),
        ).where(Country.c.code == country_code)

        countries = conn.execute(stmt).fetchall()

        if not countries:
            return []

        return {**countries[0], **reduce(_collate_languages, countries, {'languages': []})}

    except SQLAlchemyError as err:
        print(err)

    finally:
        conn.close()
