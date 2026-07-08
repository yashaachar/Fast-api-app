from fastapi import APIRouter,HTTPException,Depends,status
from schemas.job import JobCreate,JobUpdate,JobResponse
from models.job import Job
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from database import get_db
from utils.oauth2 import role_required,get_current_user
import logging

logger = logging.getLogger(__name__)

router=APIRouter(prefix="/job",tags=["job"])


@router.post("/",status_code=status.HTTP_201_CREATED,response_model=JobResponse)
async def create_job(job:JobCreate,db:AsyncSession=Depends(get_db),current_user=Depends(role_required(["admin","hr"]))):
    try:
        db_job=Job(**job.dict())
        db.add(db_job)
        await db.commit()
        await db.refresh(db_job)
        return db_job
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Job could not be created, possible duplicate or invalid data")
    except SQLAlchemyError as e:
        await db.rollback()
        logger.error(f"Database error while creating job: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")
    except Exception as e:
        await db.rollback()
        logger.error(f"Unexpected error while creating job: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")


@router.get("/",status_code=status.HTTP_200_OK,response_model=list[JobResponse])
async def get_all_job(db:AsyncSession=Depends(get_db),current_user=Depends(get_current_user)):
    try:
        result = await db.execute(select(Job))
        jobs = result.scalars().all()
        return jobs
    except SQLAlchemyError as e:
        logger.error(f"Database error while fetching jobs: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")
    except Exception as e:
        logger.error(f"Unexpected error while fetching jobs: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")


@router.get("/{id}",status_code=status.HTTP_200_OK,response_model=JobResponse)
async def get_by_id(id:int,db:AsyncSession=Depends(get_db),current_user=Depends(get_current_user)):
    try:
        result = await db.execute(select(Job).filter(Job.id == id))
        job = result.scalar_one_or_none()
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Job not found")
        return job
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        logger.error(f"Database error while fetching job {id}: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")
    except Exception as e:
        logger.error(f"Unexpected error while fetching job {id}: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")


@router.put("/{job_id}",status_code=status.HTTP_200_OK,response_model=JobResponse)
async def update_job(job_id:int,job:JobUpdate,db:AsyncSession=Depends(get_db),current_user=Depends(role_required(["admin"]))):
    try:
        result = await db.execute(select(Job).filter(Job.id == job_id))
        db_job = result.scalar_one_or_none()
        if not db_job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Job not found")

        for key,value in job.dict(exclude_unset=True).items():
            setattr(db_job,key,value)

        await db.commit()
        await db.refresh(db_job)
        return db_job
    except HTTPException:
        raise
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Job could not be updated, invalid data")
    except SQLAlchemyError as e:
        await db.rollback()
        logger.error(f"Database error while updating job {job_id}: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")
    except Exception as e:
        await db.rollback()
        logger.error(f"Unexpected error while updating job {job_id}: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")


@router.delete("/{job_id}",status_code=status.HTTP_200_OK)
async def delete_job(job_id:int,db:AsyncSession=Depends(get_db),current_user=Depends(role_required(["admin"]))):
    try:
        result = await db.execute(select(Job).filter(Job.id == job_id))
        db_job = result.scalar_one_or_none()
        if not db_job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Job not found")

        await db.delete(db_job)
        await db.commit()
        return {"message":"Job deleted successfully"}
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        await db.rollback()
        logger.error(f"Database error while deleting job {job_id}: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")
    except Exception as e:
        await db.rollback()
        logger.error(f"Unexpected error while deleting job {job_id}: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Internal server error")