"""
City

Module containing abstraction layer for API and database interaction.
"""

from city.api import (
    get_cities,
    create_city,
    update_city
)

get_cities.__doc__= """
HTTP Method: GET
Retrieve cities for a given country.

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
HTTP Method: POST
Create new city.

params:
    - city: payload in the form:

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
