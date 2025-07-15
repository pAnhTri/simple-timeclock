from flask import Blueprint, jsonify

connect_bp = Blueprint("connect", __name__)


@connect_bp.route("")
def index():
    return jsonify({"message": "CONNECTED"})
