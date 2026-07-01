from fastapi import FastAPI
from router import company, job,auth
from database import Base, engine
import model.company
import model.users
import model.job
from fastapi.middleware.cors import CORSMiddleware



#Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(company.router)
app.include_router(job.router)
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/about")
def read_about():
    return {"about": "heyy itz abt uh man"}

@app.get("/contact")
def read_contact():
    return {"phn no": "12345667"}



