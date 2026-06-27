from fastapi import APIRouter
from schemas.company import CompanyCreate,CompanyUpdate


router=APIRouter(prefix="/company",tags=["company"])
companies=[]


@router.post("/")
def create_company(company: CompanyCreate):
    companies.append(company)
    return company

@router.get("/")
def get_all_companies():
    return companies

@router.get("/{id}")
def get_by_id(id:int):
    return companies[id]

@router.put("/{id}")
def update_company(id: int, company: CompanyUpdate):
    companies[id] = company
    return companies[id]

@router.delete("/{id}")
def delete_company(id: int):
    companies.pop(id)
    return {"message": "deleted"}

##@router.get("/")
## def read_company ():
  ## return {"company":"comapny root"}

##@router.get("/{company_id}")
## def read_company(company_id: int):
    ## return {"company_id":company_id}

