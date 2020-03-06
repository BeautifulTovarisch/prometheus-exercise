#!/usr/bin/env python

from unittest import TestCase
from city.model import City, create

from database.mod import create_db_engine

def cleanup(conn, id):
    City.delete().where(City.c.id == id)

class Test(TestCase):
    def test_city_create(self):
        conn = create_db_engine().connect()

        city = { "name": "TestCity",
                 "district": "A",
                 "population": 10,
                 "countrycode": "USA" }

        id = create(conn, city)

        cleanup(conn, id)

        conn.close()
