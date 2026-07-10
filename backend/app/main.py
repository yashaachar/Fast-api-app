from fastapi import FastAPI
from router import company, job, auth, interview
from database import Base, engine
import model.company
import model.users
import model.job
from fastapi.middleware.cors import CORSMiddleware
from router import chat, company, job, auth, rag, interview
from services.llm_service import llm_response

#Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
async def startup_event():
    from database import engine
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


app.include_router(company.router)
app.include_router(job.router)
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(rag.router)
app.include_router(interview.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/about")
def read_about():
    return {"about": "heyy itz abt uh man"}

@app.get("/contact")
def read_contact():
    return {"phn no": "12345667"}