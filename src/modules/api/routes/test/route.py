from flask.blueprints import Blueprint
from flask import render_template, request, jsonify

testRoute = Blueprint('testRoute', __name__)


@testRoute.route('/test/hello', methods=['POST'])
def ggg():
    print(request)
    return jsonify({'test': 'testCalled'})
