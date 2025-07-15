from flask import Blueprint, request, jsonify
from utils import openExcelHardcoded

excel_bp = Blueprint("excel", __name__)


@excel_bp.route("")
def index():
    return "Hello, World! EXCEL"


@excel_bp.route("open", methods=["POST"])
def open():
    try:
        data = request.json

        if data and data.get("path") is not None:
            return jsonify({"message": "WIP"})
        else:
            openExcelHardcoded()
        return jsonify({"message": "Excel opened"})
    except Exception as e:
        return jsonify({"message": str(e)}), 500
