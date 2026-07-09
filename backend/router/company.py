from fastapi import APIRouter, HTTPException, Depends, status
from schemas.company import CompanyCreate, CompanyUpdate, CompanyResponse
from database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from model.company import Company
from utils.oauth2 import get_current_user, role_required


router = APIRouter(prefix="/company", tags=["company"])

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=CompanyResponse)
async def create_company(company: CompanyCreate, db: AsyncSession = Depends(get_db), current_user=Depends(role_required(["admin"]))):
    new_company = Company(**company.model_dump())
    db.add(new_company)
    await db.commit()
    await db.refresh(new_company)
    return new_company

@router.get("/", status_code=status.HTTP_200_OK, response_model=list[CompanyResponse])
async def get_all_company(db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)):
    result = await db.execute(select(Company))
    return result.scalars().all()

@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=CompanyResponse)
async def get_by_id(id: int, db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)):
    result = await db.execute(select(Company).filter(Company.id == id))
    company = result.scalar_one_or_none()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company

@router.put("/{company_id}", status_code=status.HTTP_200_OK, response_model=CompanyResponse)
async def update_company(company_id: int, company: CompanyUpdate, db: AsyncSession = Depends(get_db), current_user=Depends(role_required(["admin"]))):
    result = await db.execute(select(Company).filter(Company.id == company_id))
    db_company = result.scalar_one_or_none()
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")
    try:
        for key, value in company.model_dump(exclude_unset=True).items():
            setattr(db_company, key, value)
        await db.commit()
        await db.refresh(db_company)
        return db_company
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"An error occurred while updating the company: {str(e)}")

@router.delete("/{company_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_company(company_id: int, db: AsyncSession = Depends(get_db), current_user=Depends(role_required(["admin"]))):
    result = await db.execute(select(Company).filter(Company.id == company_id))
    db_company = result.scalar_one_or_none()
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")
    await db.delete(db_company)
    await db.commit()