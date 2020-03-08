#!/usr/bin/env python

from flask import Flask
from city.api import city_api
from country.api import country_api

app = Flask('world-data-viewer')

API = '/v0/api'

app.register_blueprint(city_api, url_prefix=f'{API}/city')
app.register_blueprint(country_api, url_prefix=f'{API}/country')

app.run(host='0.0.0.0', port=2305)
