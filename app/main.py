from fastapi import FastAPI
from router import company,job
from database import Base ,engine


app=FastAPI()
print(engine)

app.include_router(company.router)
app.include_router(job.router)


@app.get("/")
def read_root():
    return{"Hello": "World"}

@app.get("/about")
def read_about():
    return{"about": "heyy itz abt uh man"}


@app.get("/contact")
def read_contact():
    return{"phn no": "12345667"}