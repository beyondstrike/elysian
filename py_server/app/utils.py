# utils.py
from flask_jwt_extended import create_access_token
from datetime import timedelta
import os

def generate_token(identity):
    expires = timedelta(days=int(os.getenv("TOKEN_EXPIRE_DAYS", 7)))
    return create_access_token(identity=identity, expires_delta=expires)
