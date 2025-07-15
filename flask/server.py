from flask import Flask
from blueprints import all_blueprints_prefixes
from flask_cors import CORS

server = Flask(__name__)
CORS(server)

for blueprint in all_blueprints_prefixes:
    server.register_blueprint(blueprint["blueprint"], url_prefix=blueprint["prefix"])


@server.route("/")
def index():
    return "Hello, World!"


if __name__ == "__main__":
    server.run(debug=True, host="0.0.0.0", port=5000)
