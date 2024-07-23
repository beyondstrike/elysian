# models.py
from flask import current_app
from flask_bcrypt import Bcrypt
from .database import mongo

class User:
    @staticmethod
    def create_user(display_name, email, password):
        hashed_password = Bcrypt().generate_password_hash(password).decode("utf-8")
        user = {
            "displayName": display_name,
            "email": email,
            "password": hashed_password
        }
        with current_app.app_context():
            mongo.db.users.insert_one(user)
        return user

    @staticmethod
    def find_user_by_email(email):
        with current_app.app_context():
            return mongo.db.users.find_one({"email": email})

    @staticmethod
    def verify_password(stored_password, provided_password):
        return Bcrypt().check_password_hash(stored_password, provided_password)
