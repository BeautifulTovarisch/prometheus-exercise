"""
Country

Model representing country and countrylanguage database tables.

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

FUNCTIONS:
    -
    -
    -
    -

RAISES:
    - SQLAlchemyError
"""

from sqlalchemy import (
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
