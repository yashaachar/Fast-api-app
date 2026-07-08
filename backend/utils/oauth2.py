from model.users import User
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from utils.token import verify_token
from sqlalchemy.orm import Session
from model.users import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    payload = verify_token(token)
    user_id = payload.get("sub")
    result = await db.execute(select(User).filter(User.id == int(user_id)))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

def role_required(role: list):
    def role_decorator(current_user=Depends(get_current_user)):
        if current_user.role not in role:  # also fixed 'roles' -> 'role'
            raise HTTPException(status_code=403, detail="Access denied")
        return current_user 
    return role_decorator