from flask import render_template, request, jsonify
from flask.blueprints import Blueprint

filesRoute = Blueprint('filesRoute', __name__)


@filesRoute.route('/files')
def test_files():
    return jsonify({'from': 'files'})
