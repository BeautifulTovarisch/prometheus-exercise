#!/usr/bin/env python

from flask import Flask
from city.api import city_api

app = Flask(__name__)
app.config["APPLICATION_ROOT"] = "/v0/api"

app.register_blueprint(city_api)

@app.route('/')
def index():
    return 'OK'

app.run(host='0.0.0.0')
