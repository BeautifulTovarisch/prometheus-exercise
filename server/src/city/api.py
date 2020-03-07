"""
City

RESTful API endpoints configured as Flask Blueprint for modularity.
"""

from flask import Blueprint, jsonify

from city.model import (
    create,
    delete,
    search,
    update
)

from database.mod import create_db_engine

city_api = Blueprint('city_api', __name__)

@city_api.route('/', methods=['POST'])
def create_city(city):
    conn = create_db_engine().connect()
    return create(conn, city)

@city_api.route('/', methods=['PUT'])
def update_city(city):
    conn = create_db_engine.connect()
    return update(conn, city)

@city_api.route('/', methods=['DELETE'])
def delete_city(id):
    conn = create_db_engine().connect()
    return delete(conn, id)

@city_api.route('/<country>', methods=['GET'])
def get_cities(country):
    conn = create_db_engine().connect()

    return jsonify([dict(row) for row in search(conn, country)])
