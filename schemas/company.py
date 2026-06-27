from pydantic import BaseModel
from typing import Optional, List

class CompanyBase(BaseModel):
    name: str
    email: str
    phone: str

class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None

class CompanyResponse(CompanyBase):
    id: int

    class Config:
        from_attributes = True