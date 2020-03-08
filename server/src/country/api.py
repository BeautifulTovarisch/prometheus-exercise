"""
Country

RESTful API endpoints for Country entity.

API:
    - Select by region
    - Select regions by continent
    - Select by country code
"""

from flask import Blueprint, jsonify

from database.mod import create_db_engine
from country.model import fetch_regions

country_api = Blueprint('country_api', __name__)

@country_api.route('/<continent>', methods=['GET'])
def get_regions(continent):
    conn = create_db_engine().connect()
    return jsonify([region['region'] for region in fetch_regions(conn, continent)])
