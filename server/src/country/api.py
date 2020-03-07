"""
Country

RESTful API endpoints for Country entity.

API:
    - Select by region
    - Select regions by continent
    - Select by country code
"""

from flask import Blueprint, jsonify

from country.model import select_country
