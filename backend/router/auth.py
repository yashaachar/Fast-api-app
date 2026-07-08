from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


from database import get_db
from model.users import User
from schemas.users import UserCreate, UserResponse
from utils.security import hash_password, verify_password
from utils.token import create_access_token
from schemas.tokens import Token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(User).filter(User.email == user.email))
        existing_user = result.scalars().first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        hashed_password = hash_password(user.password)
        db_user = User(
            name=user.name,
            email=user.email,
            hashed_password=hashed_password,
            role=user.role
        )
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        return db_user
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500,
        detail = f"An error occurred while registering the user: {str(e)}")
    


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(select(User).filter(User.email == form_data.username))
        existing_user = result.scalars().first()
        if not existing_user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        if not verify_password(form_data.password, existing_user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        access_token = create_access_token(data={"sub": str(existing_user.id), "role": existing_user.role})
        return {"token_type": "bearer", "access_token": access_token}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while logging in: {str(e)}")
    access_token = create_access_token(data={"sub": str(existing_user.id), "role": existing_user.role})
    return {"token_type": "bearer", "access_token": access_token}
    
