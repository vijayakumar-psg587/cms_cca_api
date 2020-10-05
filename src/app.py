import os
import sys
import logging
from flask import Flask, jsonify, Blueprint, url_for, current_app, render_template, request, send_from_directory
from src.modules.common.services.app_config_service import app_load_env
from src.modules.common.util.decorator.cust_logger import custom_logger_time_wrapper
from src.modules.api.routes.test.route import testRoute
from src.modules.api.routes.files.route import filesRoute
from src.definitions import ROOT_SRC_DIR
# from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


# load confg values
app_load_env()

app.register_blueprint(testRoute)
app.register_blueprint(filesRoute)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@172.18.0.2:5432/cms_database'
# db = SQLAlchemy(app)

print(__name__)


# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     corpId = db.Column(db.String(10), unique=True)

#     def __init__(self, corp):
#         self.corpId = corp

#     def __repr__(self):
#         return '<User %r>' % self.corpId


@app.route('/test')
@custom_logger_time_wrapper(__file__, logging.INFO)
def test():
    print(os.environ.get('APP_PORT'))
    return jsonify({'name': 'Hello world'})


@app.route('/home')
def home():
    print(os.environ.get('APP_PORT'))
    return render_template('home.html', uploadFileFlag=True)


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(ROOT_SRC_DIR, 'static/images'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

# bind the port and host in flask run
