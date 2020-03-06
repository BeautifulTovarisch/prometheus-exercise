"""
City

RESTful API endpoints configured as Flask Blueprint for modularity.
"""

from flask import Blueprint

city_api = Blueprint('city_api', __name__)

@city_api.route('/city/<id>')
def test(id):
    return id
