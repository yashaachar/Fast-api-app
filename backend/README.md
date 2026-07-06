# fast-api-app

## create fastapi application


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
# non-relational databse
mongodb
caasandra
redis
dynamodb
# Constraints in DataBase
primary Key-- eg: Student_id,staff_id
foreign key-- eg: department_id in student table
unique -- eg: name
check -- eg: salary>0
default -- eg: timestamp: func.now()

# modules
sqlalchemy -- orm(object relational mapping)
fastapi -- web framework
uvicorn -- server for running fastapi
application --> 'uvicron app.main:app --reload'
psycopg2 -- postgresql driver
pydantic -- 

# concepts
depends
    Sessionmaker
        to create a session with the databse
    sessionlocal
        to create a session with the database for a single request
    declarative_base
        to create a base class for all the models

pip install alembic
alembic init alembic
alembic -> env.py -> from imported model ->metadata data alembic.ini->sqlalchemy.url to postgresql database url -----> postgrel://user:password@host:port/database_name 
alembic revision --autogenerate -m "initial migration"
alembic upgrade head


axios-which is used to call the api or which is used to fetch the data from the api

promise- which is used to handle the asynchronous operations

async/await- which is used to handle the asynchronous operations in a synchronous way


# hashing algorithm
argon2
bcrypt
python-jose[cryptography]- used to create jwt tokens
jwt tokens -> used to authenticate and authorize users
its in format xxxx.yyyy.zzzz basically 3 parts

1.header -> algo + token type:{alg:HS256,typ:JWT}
2.payload -> data, for eg: {user_id:1,role:admin}
3.signature -> used to verify the token:{hash(header+payload
+secretkey)}
access token -> used to access protected resources
refresh token -> used to refresh access token
pip install python-multipart

# RBAC (Role-Based Access Control)

Role-Based Access Control (RBAC)
--> Used to give different permissions to different roles.
--> Example:
--> Admin can do anything.
User can perform only specific actions/things.
use oauth2 module to implement RBAC
--> get_current_user() - for authenticated user
--> role_required () - for role based access control
create_access_token () - for creating acces token with (secret_key,algorithm,payload)- token created then verif_access_token() - for decoding access token withtoken with (secret_key,algorithm,token)-token decocded then  

## flow of application
1.login --> create access token
2.access token --> get current user 

# Architecture
backend/
│
├── main.py
├── database.py
│
├── models/
│   ├── users.py
│   ├── company.py
│   └── job.py
│
├── schemas/
│   ├── users.py
│   ├── company.py
│   └── job.py
│
├── routers/
│   ├── users.py
│   ├── company.py
│   └── job.py
utils/
-token.py
-security.py
-oauth2.py
--
alembic.ini
alembic/ env.py

# Task
How it will make chunks in vector db?
Let's say we have 3 documents -> one each one has 100 words
so it will make 3 chunks--each chunk will overlap with previous chunk by 100 chars->so each chunk will have 500 chars

Like 0-499
400-899
800-1399

this chunk will be converted into vectors

eg:
i am a python developer. i have 3 years of experience in python development.
i have good knowledge of python development and i am a good python developer.
i have good knowledge of fastapi

-> will convert all the 3 chunks into vectors

goldilocks principle -> just right amount of information

semantic search -> it is used to find the most relevant information to the query.
It is used to find the most relevant information to the query.

semantic similarity
It is used to find the most similar vectors.
If two vectors are close to each other then they are similar.

semantic search -> cosine similarity -> it is used to find the angle between two vectors.

qdrantdb is vector database
It is used to store the vectors and do the semantic search.

embeddings model -> it is used to convert the text into vectors.

Initially without RAG:
User query -> sent to LLM -> here the transformer model will answer based on its training data -> response.

With RAG:
User query
    -> embed done by embeddings model
    -> vector
    -> semantic search done by QdrantDB (vector DB)
    -> retrieve relevant chunks
    -> construct prompt
    -> combined text + query
    -> LLM
    -> response