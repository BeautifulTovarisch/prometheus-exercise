#!/usr/bin/env python

from unittest import TestCase

from country.model import (
    Country,

    fetch_regions,
    fetch_countries
)

from database.mod import create_db_engine

class TestCountry(TestCase):
    def test_fetch_regions(self):
        expected = sorted(['Middle East',
                           'Eastern Asia',
                           'Southeast Asia',
                           'Southern and Central Asia'])

        conn = create_db_engine().connect()

        regions = sorted([country['region'] for country in fetch_regions(conn, 'Asia')])

        self.assertEqual(regions, expected)

        conn.close()

    def test_fetch_counties(self):
        expected = sorted(['Hong Kong',
                           'Japan',
                           'China',
                           'North Korea',
                           'South Korea',
                           'Macao',
                           'Mongolia',
                           'Taiwan'])

        conn = create_db_engine().connect()

        countries = sorted([country['name'] for country in fetch_countries(conn, 'Eastern Asia')])



        self.assertEqual(countries, expected)
