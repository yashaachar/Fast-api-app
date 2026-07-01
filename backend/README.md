# Fast-api-app

## creating fastapi application

# CRUD operations
-read
-update
-delete

# Rest API
-GET
-POST
-PUT
-DELETE

# STATUS CODES
-200 OK
-201 CREATED
-204 NO CONTENT
-400 BAD REQUEST
-401 UNAUTHORIZED
-403 FORBIDDEN
-404 NOT FOUND
-405 METHOD NOT ALLOWED
-409 CONFLICT
-500 INTERNAL SERVER ERROR

# ARCHITECTURE OF FASTAPI APPLICATION
-MODEL --TABLES CREATION
-ROUTER --ROUTES REQUESTS TO CONTROLLERS
-CONTROLLER --CONTROLLER LOGIC
-SERVICE --BUSINESS LOGIC
-REPOSITORY --DATA ACCESS LAYER
-MIDDLEWARE --REQUEST PROCESSING PIPELINE

# database
# non-relational database
-mongodb
-cassandra
-redis
-dynamodb
# constraints in database
-primary key --eg: student_id
-foreign key --eg: department_id in student table
-unique --eg: email, phonenumber
-not null --eg: name
-check --eg: salary> 0
-default --eg: timestamp:func.now()

# modules
-sqlalchemy--orm(object relational mapping)
-fastapi--web framework
-uvicorn--server for running fastapi
application-->uvicorn app.main:app --reload
-psycopg2--postgresql driver

pip install alembic
alembic init alembic
alembic>env.py>sqlalchemy.url to postgresql->from imported model
alembic.ini->sqlalchemy.url to postgresql database url-->postgresql://user:postgres@host:port/database_name
alembic revision --autogenerate -m"initial migration"
alembic upgrade head