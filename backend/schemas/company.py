from pydantic import BaseModel
from typing import Optional  # capital O




class CompanyBase(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None

class CompanyCreate(CompanyBase):
     name: str
     email: str
     phone: str
     location: str
class CompanyUpdate(BaseModel):
     pass

class CompanyResponse(CompanyBase):
    id:int
    


    class Config:
        from_attributes = True
    