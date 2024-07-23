# auth.py
from flask import Blueprint, request, jsonify
from app.models import User
from flask_jwt_extended import (
    jwt_required, get_jwt_identity, create_access_token,
    create_refresh_token, unset_jwt_cookies, verify_jwt_in_request
)
import requests
import os

auth_bp = Blueprint("auth", __name__)

NODE_URL = os.getenv("NODE_SERVER_URL", "http://localhost:8840")

def fetchRandomText(register=False):
    try:
        response = requests.get(f"{NODE_URL}/random-text")
        if response.status_code == 200:
            random_text = response.json().get("randomText", "User created successfully" if register else "User logged in successfully")
        else:
            random_text = "User created successfully" if register else "User logged in successfully"
    except Exception as e:
        print(f"Error fetching random text: {e}")
        random_text = "User created successfully" if register else "User logged in successfully"
    return random_text

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if User.find_user_by_email(data["email"]):
        return jsonify({"message": "Email already registered"}), 400

    user = User.create_user(data["displayName"], data["email"], data["password"])
    
    # Fetch random text
    random_text = fetchRandomText(True)

    # Create tokens
    access_token = create_access_token(identity=user["email"])
    refresh_token = create_refresh_token(identity=user["email"])

    return jsonify({
        "message": random_text,
        "access_token": access_token,
        "refresh_token": refresh_token
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.find_user_by_email(data["email"])
    if user and User.verify_password(user["password"], data["password"]):
        access_token = create_access_token(identity=user["email"])
        refresh_token = create_refresh_token(identity=user["email"])
        
        # Fetch random text
        random_text = fetchRandomText(False)
        
        response = jsonify(access_token=access_token, refresh_token=refresh_token, message=random_text)
        return response, 200
    return jsonify({"message": "Invalid email or password"}), 401

@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True, locations=["headers"])
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    response = jsonify(access_token=new_access_token)
    return response, 200

@auth_bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"message": "Logged out successfully"})
    unset_jwt_cookies(response)
    return response, 200

@auth_bp.route("/me", methods=["GET"])
@jwt_required(locations=["headers"])
def me():
    current_user_email = get_jwt_identity()
    user = User.find_user_by_email(current_user_email)
    return jsonify({
        "displayName": user["displayName"],
        "email": user["email"]
    }), 200
