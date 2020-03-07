#!/usr/bin/env python

from unittest import TestCase

from country.model import (
    Country,

    fetch_regions
)

from database.mod import create_db_engine

class TestCountry(TestCase):
    def test_fetch_regions(self):
        expected = ['Eastern Asia',
                    'Southern and Central Asia',
                    'Southeast Asia',
                    'Middle East']

        conn = create_db_engine().connect()

        regions = [country['region'] for country in fetch_regions(conn, 'Asia')]

        self.assertEqual(regions, expected)
        
        conn.close()
