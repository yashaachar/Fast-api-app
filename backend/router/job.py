from fastapi import APIRouter, HTTPException, Depends, status
from schemas.job import JobCreate, JobUpdate, JobResponse
from sqlalchemy.orm import Session
from database import get_db
from model.job import Job
from utils.oauth2 import get_current_user, role_required

router = APIRouter(prefix="/job", tags=["job"])

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=JobResponse)
def create_job(job: JobCreate, db: Session = Depends(get_db), current_user=Depends(role_required(["admin","hr"]))):
    new_job = Job(**job.model_dump())
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

@router.get("/", status_code=status.HTTP_200_OK, response_model=list[JobResponse])
def get_all_jobs(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return db.query(Job).all()

@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=JobResponse)
def get_by_id(id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/{job_id}", status_code=status.HTTP_200_OK, response_model=JobResponse)
def update_job(job_id: int, job: JobUpdate, db: Session = Depends(get_db)):
    db_job = db.query(Job).filter(Job.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")
    for key, value in job.model_dump(exclude_unset=True).items():
        setattr(db_job, key, value)
    db.commit()
    db.refresh(db_job)
    return db_job

@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(job_id: int, db: Session = Depends(get_db)):
    db_job = db.query(Job).filter(Job.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(db_job)
    db.commit()
    return ("Job deleted successfully")