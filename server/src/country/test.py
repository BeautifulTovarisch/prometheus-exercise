#!/usr/bin/env python

from decimal import Decimal
from unittest import TestCase
from functools import reduce

from country.model import (
    Country,

    fetch_regions,
    select_country,
    fetch_countries,

    _collate_languages
)

from database.mod import create_db_engine

class TestCountryUnit(TestCase):
    def test_collate_languages(self):
        data = [{'country': 'A', 'language': i, 'isofficial': True, 'percentage': 0.5}
                for i in range(5)]

        expected = {'languages': [{'language': 0, 'isofficial': True, 'percentage': 0.5},
                                  {'language': 1, 'isofficial': True, 'percentage': 0.5},
                                  {'language': 2, 'isofficial': True, 'percentage': 0.5},
                                  {'language': 3, 'isofficial': True, 'percentage': 0.5},
                                  {'language': 4, 'isofficial': True, 'percentage': 0.5}]}

        self.assertEqual(reduce(_collate_languages, data, {'languages': []}),
                         expected)

class TestCountryIntegration(TestCase):
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

    def test_select_country(self):
        conn = create_db_engine().connect()

        expected = {
            'code': 'AFG',
            'name': 'Afghanistan',
            'continent': 'Asia',
            'region': 'Southern and Central Asia',
            'surfacearea': 652090.0,
            'indepyear': 1919,
            'population': 22720000,
            'lifeexpectancy': 45.9,
            'gnp': Decimal('5976.00'),
            'gnpold': None,
            'localname':
            'Afganistan/Afqanestan',
            'governmentform': 'Islamic Emirate',
            'headofstate': 'Mohammad Omar',
            'capital': 1,
            'code2': 'AF',
            'countrycode': 'AFG',
            'language': 'Pashto',
            'isofficial': True,
            'percentage': 52.4,
            'languages': [{'language': 'Pashto', 'isofficial': True, 'percentage': 52.4},
                          {'language': 'Dari', 'isofficial': True, 'percentage': 32.1},
                          {'language': 'Uzbek', 'isofficial': False, 'percentage': 8.8},
                          {'language': 'Turkmenian', 'isofficial': False, 'percentage': 1.9},
                          {'language': 'Balochi', 'isofficial': False, 'percentage': 0.9}]}

        self.assertEqual(select_country(conn, 'AFG'), expected)
