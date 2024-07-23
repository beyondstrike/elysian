# __init__.py
from flask import Flask, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.config import Config
from app.auth import auth_bp
from app.database import mongo

bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    if not app.config["MONGO_URI"]:
        raise ValueError("MONGO_URI is not set. Please check your .env file.")

    # Initialize the extensions with the app
    mongo.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    
    # Configure CORS to support credentials and specify the origin
    CORS(app, supports_credentials=True, origins=["*"])

    app.register_blueprint(auth_bp, url_prefix="/auth")

    @app.route("/")
    def hello_world():
        return jsonify(message="Hello, World!")

    @app.route("/check_db_connection")
    def check_db_connection():
        try:
            # Attempt to list collections in the database
            collections = mongo.db.list_collection_names()
            return jsonify(status="success", message="Database connection is good.", collections=collections)
        except Exception as e:
            return jsonify(status="error", message=str(e))

    return app
