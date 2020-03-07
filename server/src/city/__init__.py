"""
City

Module containing abstraction layer for API and database interaction.
"""

from city.api import (
    get_cities,
    create_city,
    update_city,
    delete_city
)

get_cities.__doc__= """
Retrieve cities for a given country.

GET /api/city/<country>

params:
    - country: 3-letter country code.

responses:
    200:
        List of cities in the form:

        [{ id,
           name,
           countrycode,
           district,
           population }, ... ]

"""

create_city.__doc__ = """
Create new city.

POST /api/city

params:
    - city: Payload in the form:

        {
          name,
          countrycode,
          district,
          population
        }

responses:
    200:
        Id of created city
"""

delete_city.__doc__ = """
Delete city.

DELETE /api/city/<id>

params:
    - id: Identifier corresponding to database record id.

responses:
    200:
        None
"""
