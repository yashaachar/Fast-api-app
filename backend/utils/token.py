from jose import JWTError, jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from model.users import User
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "secret")
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=2)):
    to_encode = data.copy()
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, key=SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, key=SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid credentials")