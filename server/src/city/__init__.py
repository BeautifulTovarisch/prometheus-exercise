"""
City

Module containing abstraction layer for API and database interaction.
"""

from city.api import get

get.__doc__= """
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
