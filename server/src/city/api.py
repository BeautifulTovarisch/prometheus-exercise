"""
City

RESTful API endpoints configured as Flask Blueprint for modularity.
"""

from flask import Blueprint, jsonify

from city.model import search

from database.mod import create_db_engine

city_api = Blueprint('city_api', __name__)

@city_api.route('/<country>')
def get(country):
    conn = create_db_engine().connect()

    return jsonify([dict(row) for row in search(conn, country)])
