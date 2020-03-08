"""
Country

RESTful API endpoints for Country entity.

API:
    - Select by region
    - Select regions by continent
    - Select by country code
"""

from flask import Blueprint, request, jsonify

from database.mod import create_db_engine
from country.model import (
    fetch_regions,
    select_country,
    fetch_countries
)

country_api = Blueprint('country_api', __name__)

@country_api.route('/<continent>', methods=['GET'])
def get_regions(continent):
    conn = create_db_engine().connect()
    return jsonify([region['region'] for region in fetch_regions(conn, continent)])

@country_api.route('/regions/<region>', methods=['GET'])
def get_countries_by_region(region):
    conn = create_db_engine().connect()
    return jsonify([dict(country) for country in fetch_countries(conn, region)])

@country_api.route('/code/<code>', methods=['GET'])
def get_country(code):
    conn = create_db_engine().connect()

    return jsonify(select_country(conn, code))
